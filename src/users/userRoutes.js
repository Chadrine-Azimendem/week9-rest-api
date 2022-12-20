// this is where we make our end points

const { Router } = require("express");

const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
} = require("./userControllers");

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.get("/readUsers", readUsers);

//2 more endpoints here
// update
userRouter.put("/updateUser", updateUser);

// delete
userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter;
