const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/student", [authJwt.verifyToken], controller.studentBoard);

  app.get(
    "/api/test/tutor",
    [authJwt.verifyToken, authJwt.isTutor],
    controller.tutorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  //app.get('/user/:userId', controller.allowIfLoggedin, controller.getUser);
 
  app.get('/users', [authJwt.verifyToken], controller.getUsers);
 
  //app.put('/user/:userId', controller.allowIfLoggedin, controller.grantAccess('updateAny', 'profile'), controller.updateUser);
 
  //app.delete('/user/:userId', controller.allowIfLoggedin, controller.grantAccess('deleteAny', 'profile'), controller.deleteUser);
 
};