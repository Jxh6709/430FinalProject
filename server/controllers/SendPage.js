const JSZip = require('jszip');
const axios = require('axios').default;
const moment = require('moment');
const emailHandler = require('../models/emailHandler');
const docMaker = require('../models/docMaker');
const payScale = require('../models/payScale');

const momentDate = (date) => moment(date).format('YYYY-MM-DD');

const momentTime = (time) => moment(time).format('hh:mm');

let fullUrl;

let jszip;

const parseDateExcel = (excelTimestamp) => {
  const secondsInDay = 24 * 60 * 60;
  const excelEpoch = new Date(1899, 11, 31);
  const excelEpochAsUnixTimestamp = excelEpoch.getTime();
  const missingLeapYearDay = secondsInDay * 1000;
  const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
  const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000;
  const parsed = excelTimestampAsUnixTimestamp + delta;
  return Number.isNaN(parsed) ? null : parsed;
};

const getFacultyInfoAndMakeDocument = async (id, req, res, courseArr, courses) => {
  try {
    const infoReq = axios.get(`${fullUrl}/getFacultyInfo?id=${id}`);
    const facInfo = (await infoReq).data;

    const info = facInfo.data;
    const yearsWorked = moment.duration(moment(new Date()).diff(moment(info.startDate))).years();
    console.log(req.body);
    const docObj = {
      fname: info.firstName,
      lname: info.lastName,
      street: info.street,
      city: info.city_state_zip,
      startDate: info.startDate,
      Rate_of_Pay: payScale[yearsWorked],
      semStartDate: momentDate(courses[0].startDate), // courses.startDate,
      semEndDate: momentDate(courses[0].endDate), // courses.semEndDate,
      firstPayDate: req.body.firstPayDate,
      lastPayDate: req.body.lastPayDate,
      dueDate: req.body.dueDate,
      courses: courseArr,
      yearsWorked,
    };
    const docBuffer = docMaker.docIt(docObj);
    const docName = `${info.lastName}, ${info.firstName} ${req.body.term}.docx`;
    jszip.file(docName, docBuffer, { base64: true });

    return { buffer: docBuffer, name: docName, email: info.email };
  } catch (e) {
    console.log(`could not get faculty info ${id}`);
    console.log(e);
    return res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
};

const buildCoursesArray = async (courseObjs) => {
  const courseArray = [];

  await courseObjs.forEach((c) => {
    const obj = {};

    obj.id = c.courseID;
    console.log(c);
    if (c.days !== null) {
      console.log(c.mtgStart);
      if (c.mtgStart.indexOf('.') === -1 || c.mtgEnd.indexOf('.') === -1) {
        obj.course = `${c.subject} (${c.catalog}) 0${c.section} - ${c.descr} ${c.days} ${c.mtgStart} - ${c.mtgEnd}`;
      } else {
        obj.course = `${c.subject} (${c.catalog}) 0${c.section} - ${c.descr} ${c.days} ${momentTime(new Date(parseDateExcel(c.mtgStart)))} - ${momentTime(new Date(parseDateExcel(c.mtgEnd)))}`;
      }
    } else {
      obj.course = `${c.subject} (${c.catalog}) 0${c.section} - ${c.descr} Online`;
      obj.isOnline = true;
    }

    courseArray.push(obj);
  });

  return courseArray;
};

const genenateDocumentForFaculty = async (id, req, res) => {
  try {
    const instructReq = await axios.get(`${fullUrl}/getCoursesPerInstructorAndTerm?id=${id}&term=${req.body.term}`);
    const result = await instructReq.data;

    if (result.data.length > 0) {
      const courseArr = await buildCoursesArray(result.data);
      const docObj = await getFacultyInfoAndMakeDocument(id, req, res, courseArr, result.data);

      return docObj;
    }
    return null;
  } catch (e) {
    console.log(`could not make document ${id}`);
    return res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
};

const processId = async (id, req, res) => {
  try {
    const doc = await genenateDocumentForFaculty(id, req, res);

    if (doc === undefined) {
      // pass
    }

    if (req.body.email && req.body.email === 'true') {
      if (!req.body.subject || !req.body.emailContent) {
        return res.status(400).json({ error: 'Subject and Email Content are required' });
      }
      emailHandler.sendEmail({
        subject: req.body.subject,
        content: req.body.emailContent,
        email: doc.email,
      },
      doc.buffer, doc.name);
    }
    return { message: 'Success' };
  } catch (e) {
    console.log(e);
    // return res.status(500).json({ error: 'Something went wrong, please try again later.' });
    return { message: 'Failure' };
  }
};

const asyncForEach = async (ids, doingAll, callback) => {
  const len = ids.length;
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line no-await-in-loop
    await callback((doingAll === true) ? ids[i]._id : ids[i]);
  }
};

const handleContracts = async (req, res) => {
  fullUrl = `${req.protocol}://${req.get('host')}`;
  // CLEAR ZIPS
  jszip = new JSZip();

  req.body = req.body.data;

  const firstPayDate = req.body.firstPayDate || null;
  const lastPayDate = req.body.lastPayDate || null;
  const dueDate = req.body.dueDate || null;
  const term = req.body.term || null;

  if (firstPayDate === null || lastPayDate === null || dueDate === null || term === null) {
    return res.status(400).json({ error: 'Dates and term are requiresd' });
  }

  if (req.body.faculty) {
    // handle selected
    const facIds = req.body.faculty.split('-');
    const start = async () => {
      await asyncForEach(facIds, false, async (id) => {
        await processId(id, req, res);
        console.log(id);
      });

      jszip.generateAsync({ type: 'base64' }).then((base64) => res.json({ href: `data:application/zip;base64,${base64}` }));
    };
    start();
  } else {
    // handle all
    try {
      const axRequest = await axios.get(`${fullUrl}/getFaculty`);
      const result = await axRequest.data;

      if (result.error || !result.data) {
        return res.status(404).json({ error: 'No Faculty Found' });
      }

      const facIds = result.data;

      const start = async () => {
        await asyncForEach(facIds, true, async (id) => {
          await processId(id, req, res);
          console.log(id);
        });

        jszip.generateAsync({ type: 'base64' }).then((base64) => res.json({ href: `data:application/zip;base64,${base64}` }));
      };
      start();
      // facIds.forEach(async (id) => {
      //   await processId(id._id, req, res);
      // });
    } catch (e) {
      console.log('main', e);
      return res.status(500).json({ error: 'Something went wrong, please try again later.' });
    }
  }
  return true;
  // return res.json({ message: 'Successfully processed all people' });
};


module.exports = {
  handleContracts,
  parseDateExcel,
};
