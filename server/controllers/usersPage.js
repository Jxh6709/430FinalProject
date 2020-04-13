const models = require('../models');

const { Account } = models;

// https://www.w3resource.com/javascript/form/email-validation.php
const confirmMail = (mail) => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  return (false);
};

const getInfo = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
    if (err || !doc) {
      return res.status(401).json({ error: 'Username not found' });
    }
    return res.json(doc);
  });
};


const updateUser = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.newData;
  if (data._id) {
    delete data._id;
  }

  return Account.AccountModel.updateUser(data._id, data, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: `Could Not Update User ${data.username}` });
    }
    return res.status(204).json({ success: 'User has been updated', doc });
  });
};

const getAllUsers = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.getUsers(req.session.account._id, (err, docs) => {
    if (err || !docs) {
      return res.status(404).json({ error: 'No Records Found' });
    }

    const cols = Object.keys(docs[0]);
    const colReturn = [];
    cols.forEach((col) => {
      colReturn.push({ title: col, field: col });
    });
    return res.json({ users: docs, cols: colReturn });
  });
};

const addUser = (request, response) => {
  // ?
  const req = request;
  const res = response;
  const { newData } = req.body;

  // validate
  if (!newData.username || !newData.firstName || !newData.email || !newData.lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!confirmMail(newData.email)) {
    return res.status(400).json({ error: 'Invalid Email Address' });
  }

  return Account.AccountModel.generateHash('password', (salt, hash) => {
    const accountData = {
      username: newData.username,
      salt,
      password: hash,
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ success: `${newData.username} has been created` });
    });

    savePromise.catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username is taken' });
      }
      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

const deleteUser = (request, response) => {
  const req = request;
  const res = response;

  const data = req.body.oldData;
  console.log(req.body);

  return Account.AccountModel.findByIdAndDelete(data._id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log('Successful deletion');
    return res.json({ message: 'Account Has Been Deleted' });
  });
};

module.exports = {
  getInfo,
  updateUser,
  getUsers: getAllUsers,
  addUser,
  deleteUser,

};
