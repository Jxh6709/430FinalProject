const controllers = require('./controllers');
const mid = require('./middleware');


const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/app', mid.requiresSecure, mid.requiresLogin, controllers.MainApp.profilePage);

  app.post('/setComponent', mid.requiresLogin, controllers.MainApp.setActiveComponent);
  app.get('/getComponent', mid.requiresLogin, controllers.MainApp.getActiveComponent);

  app.get('/getUserInfo', mid.requiresLogin, controllers.UserPage.getInfo);
  app.put('/updateUser', mid.requiresLogin, controllers.UserPage.updateUser);
  app.post('/addUser', mid.requiresLogin, mid.requiresSecure, controllers.UserPage.addUser);
  app.delete('/deleteUser', mid.requiresLogin, mid.requiresSecure, controllers.UserPage.deleteUser);
  app.get('/getUsers', mid.requiresSecure, controllers.UserPage.getUsers);

  app.get('/getFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.getAllFaculty);
  app.put('/updateFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.updateFaculty);
  app.post('/addFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.addFaculty);
  app.delete('/deleteFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.deleteFaculty);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
