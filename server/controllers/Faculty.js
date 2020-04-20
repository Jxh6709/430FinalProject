const models = require('../models');

const { Faculty } = models;
const helpers = require('./helpers');

const getAllFaculty = (req, res) => Faculty.FacultyModel.getAllFaculty((err, docs) => {
  if (err || !docs) {
    return res.status(404).json({ error: 'No Faculty Found' });
  }

  const schema = helpers.buildTableStructureFromSchema(Faculty.FacultySchema);

  return res.json({ data: docs, cols: schema });
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
  console.log(req.body);

  return Faculty.FacultyModel.findByIdAndDelete(data._id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log('Successful deletion');
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


module.exports = {
  getAllFaculty,
  addFaculty,
  deleteFaculty,
  updateFaculty,
};
