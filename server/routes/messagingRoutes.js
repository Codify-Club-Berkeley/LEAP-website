//const express = require("express")
const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");
const { accessChat } = require("../controllers/chatController")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("/api/chat", [authJwt.verifyToken], accessChat); 
    //app.get("/", [authJwt.verifyToken], accessChat); 
    //app.post("/group", [authJwt.verifyToken], createGroupChat); 
    //app.put("/rename", [authJwt.verifyToken], renameGroup); 
    //app.put("/groupremove", [authJwt.verifyToken], removeFromGroup); 
    //app.put("/groupadd", [authJwt.verifyToken], addToGroup); 

}