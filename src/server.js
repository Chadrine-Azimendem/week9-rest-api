// run the connection file to check that all is working properly
require("./db/connection");

const express = require("express");
const userRouter = require("./users/userRoutes");

const app = express();

// define a port for the server
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
