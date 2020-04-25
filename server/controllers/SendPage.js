const stream = require('stream');
const ADM = require('adm-zip');
const axios = require('axios').default;
// const downFolder = require('downloads-folder');
// const fs = require('fs');
// const path = require('path');
const moment = require('moment');
const emailHandler = require('../models/emailHandler');
const docMaker = require('../models/docMaker');

const momentDate = (date) => moment(date).format('YYYY-MM-DD');

const momentTime = (time) => moment(time).format('HH:mm');

let fullUrl;

let zip;

const getFacultyInfoAndMakeDocument = async (id, req, res, courseArr, courses) => {
  try {
    const infoReq = axios.get(`${fullUrl}/getFacultyInfo?id=${id}`);
    const facInfo = (await infoReq).data;

    const info = facInfo.data;

    const docObj = {
      fname: info.firstName,
      lname: info.lastName,
      street: info.street,
      city: info.city_state_zip,
      Rate_of_Pay: 1500,
      semStartDate: momentDate(courses[0].startDate), // courses.startDate,
      semEndDate: momentDate(courses[0].endDate), // courses.semEndDate,
      firstPayDate: req.body.firstPayDate,
      lastPayDate: req.body.lastPayDate,
      dueDate: req.body.dueDate,
      courses: courseArr,
    };
    const docBuffer = docMaker.docIt(docObj);
    const docName = `${info.lastName}, ${info.firstName} ${req.body.term}.docx`;
    zip.addFile(docName, docBuffer);

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
    obj.course = `${c.subject} (${c.catalog}) - ${c.descr} ${c.section} ${c.classNbr} ${momentDate(c.startDate)} - ${momentDate(c.endDate)} ${momentTime(c.mtgStart)} - ${momentTime(c.mtgEnd)}`;
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
      console.log(`id ${id} produced undefined`);
    }
    console.log(zip.getEntries().length);

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
    } else {
      console.log('Data Not Available Yet');
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
    callback((doingAll === true) ? ids[i]._id : ids[i]);
  }
};

const handleContracts = async (req, res) => {
  fullUrl = `${req.protocol}://${req.get('host')}`;
  // CLEAR ZIPS
  zip = new ADM();

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
    facIds.forEach((id) => {
      processId(id, req, res);
    });
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
        const zipBuf = zip.toBuffer();
        const readStream = new stream.PassThrough();
        readStream.end(zipBuf);

        res.set('Content-disposition', 'attachment; filename=contracts.zip');
        res.set('Content-Type', 'zip');
        readStream.pipe(res);
        // res.contentType('zip');
        // res.download(zipBuf);
        // console.log(res);
        // res.end();
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
};
