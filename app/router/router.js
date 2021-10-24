const path = require("path");
const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");

module.exports = function (app) {
  const controller = require("../controller/controller.js");
  const taskController = require("../controller/taskController.js");

    app.get("/", (req, res) => {
        res.send("Yes API is working")
    })



  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/user", [authJwt.verifyToken], controller.userContent);


    app.post("/api/task/create", [authJwt.verifyToken],taskController.createTask);

    app.get("/api/task", [authJwt.verifyToken], taskController.getAllTaskofUser);

    app.put("/api/task/edit", [authJwt.verifyToken], taskController.updateTask);

    app.delete("/api/task/delete", [authJwt.verifyToken], taskController.deleteTask);

};
