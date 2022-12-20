const User = require("./userModel");
const jwt = require("jsonwebtoken");

// controller
exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).send({ username: "a user has been successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// update field (make it dynamic)

exports.updateUser = async (req, res) => {
  try {
    const filter = { email: req.body.email };
    const update = { password: req.body.password };

    let updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(updatedUser);
    res.status(200).send({ password: "password successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const filter = { email: req.body.email };

    let deletedUser = await User.deleteOne(filter);
    console.log(deletedUser.deletedCount);
    res.status(200).send({ password: "User successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//POST
//http://localhost:5001/login
// {
//     "username" : "test1",
//     "password": "password123"
// }
exports.loginUser = async (req, res) => {
  console.log("middleware passed and controller has been called");
  try {
    const user = await User.findOne({ username: req.body.username });
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
    console.log(token);
    res.status(200).send({ username: user.username, token });
  } catch (error) {
    console.log(error);
    console.log("username not found");
    res.status(500).send({ error: error.message });
  }
};
