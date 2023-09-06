const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const users = require("./routers/users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = process.env.SERVER_PORT;

app.use("/users", users);

app.listen(SERVER_PORT, (error) => {
  if (!error) console.log("Server is running on " + SERVER_PORT);
  else console.log("Error: ", error);
});
