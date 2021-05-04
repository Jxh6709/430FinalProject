const axios = require('axios').default;


const readXlsxFile = require('read-excel-file/node');
const moment = require('moment');
const SendPage = require('./SendPage');
const models = require('../models');
const helpers = require('./helpers');


const { Courses } = models;

const upload = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}`;
  console.log(req.file);
  try {
    if (req.file === undefined) {
      return res.status(400).error({ error: 'Please Upload an Excel File' });
    }

    const path = `${__dirname
    }../../../resources/static/assets/uploads/${req.file.filename}`;

    const coursesToAdd = [];
    const promises = [];

    return readXlsxFile(path).then((rows) => {
      // remove headers for now
      const headers = rows[0];
      const lheaders = headers.map(h => h.toLowerCase());
      rows.shift();

      rows.forEach((r) => {
        const dates = r[lheaders.indexOf("dates")].split(' - ');
        const nameSplit = r[lheaders.indexOf("instructor")].split(',');
        console.log(nameSplit);
        promises.push(axios.get(
          `${fullUrl}/getFacultyByName?fname=${nameSplit[1].split(' ')[0]}&lname=${nameSplit[0]}`,
        ).then((result) => {
          const id = result.data.data._id;
          const courseData = {
            courseID: r[lheaders.indexOf("course id")],
            term: r[lheaders.indexOf("term")],
            classNbr: r[lheaders.indexOf("class nbr")],
            subject: r[lheaders.indexOf("subject")],
            catalog: r[lheaders.indexOf("catalog")],
            descr: r[lheaders.indexOf("descr")],
            section: r[lheaders.indexOf("section")],
            startDate: dates[0],
            endDate: dates[1],
            days: r[lheaders.indexOf("days")],
            mtgStart: r[lheaders.indexOf("mtg start")],
            mtgEnd: r[lheaders.indexOf("mtg end")],
            instructor: id,
          };
          // console.log(courseData);
          coursesToAdd.push(courseData);
        }).catch((err) => {
          console.log(err.response.config.url);
        }));
      });
      return Promise.all(promises).then(() => Courses.CoursesModel.insertMany(coursesToAdd).then(() => res.json({ success: 'Successful upload' }))
        .catch((err) => res.status(400).json({ error: err.message })));
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Something went wrong ' });
  }
};

const momentDate = (date) => moment(date).format('YYYY-MM-DD');

const momentTime = (time) => moment(time).format('hh:mm');

const getAllCourses = (req, res) => Courses.CoursesModel.getAllCourses((err, docs) => {
  if (err || !docs) {
    return res.status(404).json({ error: 'No Courses Found' });
  }
  const newDocs = [];
  docs.forEach((d) => {
    const doc = d;
    if (doc.mtgStart == null || doc.mtgEnd == null) {
      return newDocs.push(doc);
    }
    let start;
    let end;
    if (parseFloat(doc.mtgStart) > 0.0 && parseFloat(doc.mtgEnd) < 1.0) {
      start = momentTime(new Date(SendPage.parseDateExcel(doc.mtgStart)));
      end = momentTime(new Date(SendPage.parseDateExcel(doc.mtgEnd)));
      console.log(doc.mtgStart);
      console.log(start);
      doc.mtgStart = start;
      doc.mtgEnd = end;
    } else {
      start = momentTime(doc.mtgStart) || doc.mtgStart;
      end = momentTime(doc.mtgEnd) || doc.mtgEnd;
      doc.mtgStart = moment(doc.mtgStart).isValid() ? start : doc.mtgStart;
      doc.mtgEnd = moment(doc.mtgEnd).isValid() ? end : doc.mtgEnd;
    }

    const d1 = momentDate(doc.startDate) || doc.startDate;
    const d2 = momentDate(doc.endDate) || doc.endDate;
    doc.startDate = moment(doc.startDate).isValid() ? d1 : doc.startDate;
    doc.endDate = moment(doc.endDate).isValid() ? d2 : doc.endDate;

    return newDocs.push(doc);
  });

  let schema = null;
  return helpers.buildTableStructureFromSchema(Courses.CoursesSchema).then((result) => {
    schema = result;
    return res.json({ data: newDocs, cols: schema });
  });
});

const addCourse = (request, response) => {
  // ?
  const req = request;
  const res = response;
  const { newData } = req.body;

  // validate
  if (!newData.courseID || !newData.term || !newData.classNbr
            || !newData.subject || !newData.catalog || !newData.descr
            || !newData.section || !newData.startDate || !newData.endDate
            || !newData.mtgStart || !newData.mtgEnd || !newData.instructor) {
    return res.status(400).json({ error: 'All fields are required' });
  }


  const courseData = {
    courseID: newData.courseID,
    term: newData.term,
    classNbr: newData.classNbr,
    subject: newData.subject,
    catalog: newData.catalog,
    descr: newData.descr,
    section: newData.section,
    startDate: newData.startDate,
    endDate: newData.endDate,
    mtgStart: newData.mtgStart,
    mtgEnd: newData.mtgEnd,
    instructor: newData.instructor,
  };

  const newCourse = new Courses.CoursesModel(courseData);
  return newCourse.save()
    .then(() => res.json({ success: `${newData.descr} has been created` }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const deleteCourse = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.oldData;

  return Courses.CoursesModel.findByIdAndDelete(data._id, (err) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ message: 'Course Has Been Deleted' });
  });
};

const updateCourse = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.newData;
  if (data._id) {
    delete data._id;
  }

  return Courses.CoursesModel.updateCourse(data._id, data, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: 'Could Not Update Course' });
    }
    return res.status(204).json({ success: 'Course has been updated', doc });
  });
};

const getTerms = (req, res) => {
  Courses.CoursesModel.getTerms((err, terms) => {
    if (err || !terms) {
      return res.status(404).json({ error: 'No Terms Found' });
    }

    return res.json({ data: terms });
  });
};

const getSpecificCourses = (req, res) => {
  if (!req.query.id || !req.query.term) {
    return res.status(400).json({ error: 'Id and term are both required' });
  }
  return Courses.CoursesModel.getPerInstAndTerm(req.query.id,
    req.query.term, (err, docs) => {
      if (err || !docs) {
        return res.status(404).json({ error: 'No Courses Found' });
      }

      return res.json({ data: docs });
    });
};

module.exports = {
  getAllCourses,
  updateCourse,
  addCourse,
  deleteCourse,
  getTerms,
  getCoursesPerInstructorAndTerm: getSpecificCourses,
  upload,
};
