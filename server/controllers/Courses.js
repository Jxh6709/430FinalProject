const models = require('../models');
const helpers = require('./helpers');

const { Courses } = models;


const getAllCourses = (req, res) => Courses.CoursesModel.getAllCourses((err, docs) => {
  if (err || !docs) {
    return res.status(404).json({ error: 'No Courses Found' });
  }

  let schema = null;
  return helpers.buildTableStructureFromSchema(Courses.CoursesSchema).then((result) => {
    schema = result;
    return res.json({ data: docs, cols: schema });
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
};
