const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/userModel");

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // move to the next step(comes from express)
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    console.log("PLAIN TEXT PASSWORD");
    console.log(req.body.password);
    console.log("HASHED PASSWORD");
    console.log(req.user.password);

    // console.log("user found in the database");

    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      console.log(
        "username exists and plain text password matches hashed password"
      );
      next();
    } else {
      throw new Error("incorect username or password");
    }
    // move to the next step(comes from express)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    // decode the token
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    // console.log("decoded Token");
    // console.log(decodedToken._id);
    const user = await User.findById(decodedToken._id);
    // console.log("find by id");
    // console.log(user);

    if (user) {
      next();
    } else {
      throw new Error("user is not authorised");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
