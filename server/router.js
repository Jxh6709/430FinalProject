const controllers = require('./controllers');
const mid = require('./middleware');


const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);

  app.get('/app', mid.requiresSecure, mid.requiresLogin, controllers.MainApp.profilePage);

  app.get('/getUserInfo', mid.requiresLogin, controllers.UserPage.getInfo);
  app.put('/updateUser', mid.requiresLogin, controllers.UserPage.updateUser);
  app.post('/addUser', mid.requiresLogin, mid.requiresSecure, controllers.UserPage.addUser);
  app.delete('/deleteUser', mid.requiresLogin, mid.requiresSecure, controllers.UserPage.deleteUser);
  app.get('/getUsers', mid.requiresSecure, controllers.UserPage.getUsers);

  app.get('/getFaculty', controllers.Faculty.getAllFaculty);
  app.put('/updateFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.updateFaculty);
  app.post('/addFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.addFaculty);
  app.delete('/deleteFaculty', mid.requiresLogin, mid.requiresSecure, controllers.Faculty.deleteFaculty);
  app.get('/getTerms', mid.requiresSecure, controllers.Courses.getTerms);
  app.get('/getCoursesPerInstructorAndTerm', mid.requiresSecure, controllers.Courses.getCoursesPerInstructorAndTerm);
  app.get('/getFacultyInfo', mid.requiresSecure, controllers.Faculty.getInstructor);

  app.get('/getCourses', mid.requiresLogin, mid.requiresSecure, controllers.Courses.getAllCourses);
  app.put('/updateCourse', mid.requiresLogin, mid.requiresSecure, controllers.Courses.updateCourse);
  app.post('/addCourse', mid.requiresLogin, mid.requiresSecure, controllers.Courses.addCourse);
  app.delete('/deleteCourse', mid.requiresLogin, mid.requiresSecure, controllers.Courses.deleteCourse);

  app.post('/handleContracts', mid.requiresLogin, mid.requiresSecure, controllers.SendPage.handleContracts);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.MainApp.notFound);
};

module.exports = router;
