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
const isUser = require("./middlewares/isUserMiddleware");
const { connection } = require("./config/mysql.js");

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

app.get("/recent", isUser, function (req, res) {
  const db = connection.init();
  connection.open(db);
  db.query(
    "SELECT post_id, title, content, posts.edited_time AS edited_time, courses.course_id AS course_id, course_name, professor_id FROM posts LEFT JOIN courses ON courses.course_id=posts.course_id " +
      "WHERE posts.course_id IN (SELECT course_id FROM registration WHERE student_id=?) ORDER BY posts.edited_time ASC",
    [req.session.user_id],
    (error, rows, fields) => {
      if (error) res.status(500).json("최근 게시글 조회에 실패했습니다.");
      res.status(200).json(rows);
    }
  );
});

app.listen(SERVER_PORT, (error) => {
  if (!error) console.log("Server is running on " + SERVER_PORT);
  else console.log("Error: ", error);
});
