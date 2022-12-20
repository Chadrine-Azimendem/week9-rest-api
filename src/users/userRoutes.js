// this is where we make our end points

const { Router } = require("express");

const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("./userControllers");

const { hashPassword, comparePass, tokenCheck } = require("../middleware");

const userRouter = Router();

//GET - On a GET method an endpoint should be returning static information or reading a database.
//POST - On a POST method, data should be sent in the http request to be used by the controller in some way (creating a database entry).
//PUT/PATCH - The PUT and PATCH methods handle update requests, for instance updating data in a database.
//DELETE - Fairly self-explanatory, data should be deleted on a DELETE method.

userRouter.post("/createUser", hashPassword, createUser);
userRouter.post("/login", comparePass, loginUser);
userRouter.get("/readUsers", tokenCheck, readUsers); //protected end point
// update
userRouter.put("/updateUser", updateUser);
// delete
userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter;
