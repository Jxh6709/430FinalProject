const profilePage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken(), greeting: `Welcome ${req.session.account.username}` });
};
// using redis sessions to remember the active component
// having both a setter and a getter
const setActiveComponent = (req, res) => {
  req.session.activeComponent = 'send';
  return res.status(204);
};
const getActiveComponent = (req, res) => {
  if (!req.session.activeComponent) {
    req.session.activeComponent = 'profile';
    return res.status(400).json({ error: 'Could Not Retrieve Active Component' });
  }
  return res.json({ activeComponent: req.session.activeComponent });
};

module.exports = {
  profilePage,
  setActiveComponent,
  getActiveComponent,
};
