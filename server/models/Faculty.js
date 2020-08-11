const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.Promise = global.Promise;

let FacultyModel = {};

const FacultySchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  yearsWorked: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city_state_zip: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
FacultySchema.index({ firstName: 1, lastName: 1 }, { unique: true });

FacultySchema.statics.updateFaculty = (id, facultyObj, callback) => {
  FacultyModel.findOneAndUpdate(id, facultyObj, {
    new: true,
  }, callback);
};

FacultySchema.statics.getAllFaculty = (callback) => FacultyModel.find({})
  .select('firstName lastName yearsWorked street city_state_zip email startDate')
  .lean()
  .exec(callback);

FacultySchema.statics.getInstructors = (callback) => FacultyModel.find({}).distinct('_id', callback);

FacultySchema.statics.getInstructor = (id, cb) => FacultyModel.findOne({ _id: id }).lean().exec(cb);

const find = (fn, ln, cb) => FacultyModel.findOne({ firstName: fn, lastName: ln }).lean().exec(cb);

FacultySchema.statics.getInstructorByName = (fn, ln, cb) => find(fn, ln, cb);


FacultyModel = mongoose.model('Faculty', FacultySchema);
module.exports.FacultyModel = FacultyModel;
module.exports.FacultySchema = FacultySchema;
