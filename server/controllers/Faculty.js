const readXlsxFile = require('read-excel-file/node');
const moment = require('moment');
const models = require('../models');

const { Faculty } = models;
const helpers = require('./helpers');

const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).error({ error: 'Please Upload an Excel File' });
    }

    const path = `${__dirname
    }../../../resources/static/assets/uploads/${req.file.filename}`;

    const facultyToInsert = [];

    readXlsxFile(path).then((rows) => {
      // removing headers will validate later
      rows.shift();

      rows.forEach((row) => {
        const fac = {
          firstName: row[1],
          lastName: row[0],
          email: row[6],
          yearsWorked: row[2],
          street: row[3],
          city_state_zip: row[4],
          startDate: moment(row[7]).format('MM/DD/YY'),
        };
        facultyToInsert.push(fac);
      });
    });
    return Faculty.FacultyModel.insertMany(facultyToInsert).then(() => res.json({ success: 'Successful Upload' }))
      .catch((err) => res.status(400).json({ error: err.message }));
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong ' });
  }
};

const getAllFaculty = (req, res) => Faculty.FacultyModel.getAllFaculty((err, docs) => {
  if (err || !docs) {
    return res.status(404).json({ error: 'No Faculty Found' });
  }

  let schema = null;
  return helpers.buildTableStructureFromSchema(Faculty.FacultySchema).then((result) => {
    schema = result;
    return res.json({ data: docs, cols: schema });
  });
});

const addFaculty = (request, response) => {
  // ?
  const req = request;
  const res = response;
  const { newData } = req.body;

  // validate
  if (!newData.yearsWorked || !newData.firstName || !newData.email
        || !newData.lastName || !newData.street || !newData.city_state_zip
        || !newData.startDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!helpers.confirmMail(newData.email)) {
    return res.status(400).json({ error: 'Invalid Email Address' });
  }

  const facData = {
    firstName: newData.firstName,
    lastName: newData.lastName,
    email: newData.email,
    yearsWorked: newData.yearsWorked,
    street: newData.street,
    city_state_zip: newData.city_state_zip,
    startDate: newData.startDate,
  };

  const newFaculty = new Faculty.FacultyModel(facData);
  return newFaculty.save()
    .then(() => res.json({ success: `${newData.lastName}, ${newData.firstName} has been created` }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const deleteFaculty = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.oldData;

  return Faculty.FacultyModel.findByIdAndDelete(data._id, (err) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.json({ message: 'Faculty Has Been Deleted' });
  });
};

const updateFaculty = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.newData;
  if (data._id) {
    delete data._id;
  }

  return Faculty.FacultyModel.updateFaculty(data._id, data, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: 'Could Not Update Faculty' });
    }
    return res.status(204).json({ success: 'Faculty has been updated', doc });
  });
};

const getInstructor = (request, response) => {
  const req = request;
  const res = response;

  if (!req.query.id) {
    return res.status(400).json({ error: 'id is required' });
  }

  return Faculty.FacultyModel.getInstructor(req.query.id, (err, doc) => {
    if (err || !doc) {
      return res.status(404).json({ error: `Could Not Find Faculty with id ${req.query.id}` });
    }
    return res.json({ data: doc });
  });
};

const getInstructorByName = (request, response) => {
  const req = request;
  const res = response;

  if (!req.query.fname || !req.query.lname) {
    return res.status(400).json({ error: 'first and last name are required' });
  }

  return Faculty.FacultyModel.getInstructorByName(req.query.fname, req.query.lname, (err, doc) => {
    if (err || !doc) {
      return res.status(404).json({ error: `Could Not Find Faculty ${req.query.fname} ${req.query.lname}` });
    }
    return res.json({ data: doc });
  });
};


module.exports = {
  getAllFaculty,
  addFaculty,
  deleteFaculty,
  updateFaculty,
  getInstructor,
  getInstructorByName,
  upload,
};
