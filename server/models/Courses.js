const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.Promise = global.Promise;

let CoursesModel = {};

const CoursesSchema = new mongoose.Schema({
  courseID: {
    required: true,
    type: Number,
  },
  term: {
    required: true,
    type: Number,
  },
  classNbr: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  catalog: {
    type: Number,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  mtgStart: {
    type: String,
    required: false,
  },
  mtgEnd: {
    type: String,
    required: false,
  },
  instructor: {
    required: true,
    type: String,
  },
  days: {
    type: String,
    default: 'TBD',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CoursesSchema.statics.updateCourse = (id, coursesObj, callback) => {
  CoursesModel.findOneAndUpdate(id, coursesObj, {
    new: true,
  }, callback);
};


CoursesSchema.statics.getAllCourses = (callback) => CoursesModel.find({})
  .lean()
  .exec(callback);

CoursesSchema.statics.getTerms = (callback) => CoursesModel.find().distinct('term', callback);

CoursesSchema.statics.getPerInstAndTerm = (id, term, cb) => {
  const fields = { term, instructor: id };
  CoursesModel.find(fields).lean().exec(cb);
};

CoursesModel = mongoose.model('Courses', CoursesSchema);

module.exports = {
  CoursesModel,
  CoursesSchema,
};
