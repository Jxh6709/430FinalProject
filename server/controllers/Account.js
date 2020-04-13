const models = require('../models');
const UserPage = require('./usersPage');

const { Account } = models;

const loginPage = (req, res) => {
  //setting up if no users
  Account.AccountModel.getUsers(null,(err,docs) => {
    if (err) console.log(err);
    //if no current users
    if (!docs) {
      const defaultUser = {
        username: 'abcd',
        firstName: 'John',
        lastName: 'Smith',
        email: '1@1.com'
      };
      req.body.newData = defaultUser;
      UserPage.addUser(req,res);
    }
  });

  res.render('login', { csrfToken: req.csrfToken(), title: 'Contract Solutions' });
};


const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  // ?
  const req = request;
  const res = response;

  // casting our roles
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // B storing data
    req.session.account = Account.AccountModel.toAPI(account);
    req.session.activeComponent = 'profile';

    return res.json({ redirect: '/app', pageToLoad: 'profile' });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  res.json(csrfJSON);
};

module.exports = {
  loginPage,
  login,
  logout,
  getToken,
};
