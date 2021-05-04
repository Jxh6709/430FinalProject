const profilePage = (req, res) => {
  res.render('app', { //csrfToken: req.csrfToken(), 
    greeting: `Welcome ${req.session.account.username}` 
  });
};

const notFound = (req, res) => {
  res.render('notFound', { title: 'Contracts Not Found', page: req.url });
};

module.exports = {
  profilePage,
  notFound,
};
