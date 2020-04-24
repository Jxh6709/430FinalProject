const ignoredFields = ['createdDate', 'salt', '__v', 'isAdmin', 'password', '_id'];
const models = require('../models');

const { Faculty } = models;

const buildTableStructureFromSchema = async (schema) => {
  let structure = [];

  const getInstructors = async (struct) => {
    const str = struct;

    const docs = await Faculty.FacultyModel.find();

    const lookup = {};
    docs.forEach((element) => {
      lookup[element._id] = `${element.lastName}, ${element.firstName}`;
    });
    str.push({ title: 'instructor', field: 'instructor', lookup });
    return Promise.resolve(str);
  };

  // based on the tyoe of data we build the table structure accordingly
  schema.eachPath((path, type) => {
    if (ignoredFields.includes(path) || path === 'instructor') {
      // pass
    } else if (type.instance === 'Number') {
      structure.push({ title: path, field: path, type: 'numeric' });
    } else if (type.instance === 'Date') {
      if (path.includes('mtg')) {
        // we want time
        structure.push({ title: path, field: path, type: 'time' });
      } else {
        // we want date
        structure.push({ title: path, field: path, type: 'date' });
      }
    } else {
      structure.push({ title: path, field: path });
    }
  });

  if (Object.keys(schema.paths).includes('instructor')) {
    return getInstructors(structure).then((doc) => {
      structure = doc;
      return Promise.resolve(structure);
    });
  }
  return Promise.resolve(structure);
};


// https://www.w3resource.com/javascript/form/email-validation.php
const confirmMail = (mail) => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  return (false);
};

module.exports = {
  buildTableStructureFromSchema,
  confirmMail,
};
