const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { mysqlConfig } = require("./config/mysql.js");
require("dotenv").config();

const app = express();
const users = require("./routers/users");
const auth = require("./routers/auth");
const courses = require("./routers/courses");
const registration = require("./routers/registration");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MySQLStore(mysqlConfig);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 24,
    },
  })
);

const SERVER_PORT = process.env.SERVER_PORT;

app.use("/users", users);
app.use("/auth", auth);
app.use("/courses", courses);
app.use("/registration", registration);

app.listen(SERVER_PORT, (error) => {
  if (!error) console.log("Server is running on " + SERVER_PORT);
  else console.log("Error: ", error);
});
