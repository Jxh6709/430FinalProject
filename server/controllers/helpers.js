const ignoredFields = ['createdDate', 'salt', '__v', 'isAdmin', 'password'];

const buildTableStructureFromSchema = (schema) => {
  const structure = [];

  schema.eachPath((path, type) => {
    if (ignoredFields.includes(path)) {
      console.log('ignoring');
    } else if (type.instance === 'Number') {
      structure.push({ title: path, field: path, type: 'numeric' });
    } else if (type.instance === 'Date') {
      structure.push({ title: path, field: path, type: 'date' });
    } else {
      structure.push({ title: path, field: path });
    }
  });

  return structure;
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
