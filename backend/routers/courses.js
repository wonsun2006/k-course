const express = require("express");
const router = express.Router();
const { connection } = require("../config/mysql.js");
const isProfessor = require("../middlewares/isProfessorMiddleware.js");
const isUser = require("../middlewares/isUserMiddleware.js");
const { checkKeys, createHash } = require("../utils/common.js");
const db = connection.init();
connection.open(db);

router.post("/", isProfessor, function (req, res) {
  const body = req.body;
  const required_key = ["course_name", "user_id"];
  const insufficient_key = checkKeys(body, required_key);
  if (!insufficient_key) {
    res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
  }
  db.query(
    "INSERT INTO courses(course_name, user_id, edited_time) VALUES (?,?,NOW())",
    [body.course_name, req.session.user_id],
    (error, result) => {
      res.status(200).json("강의가 성공적으로 생성되었습니다.");
    }
  );
});

router.get("/", isUser, function (req, res) {
  const query =
    req.session.user_role === 0 ? "" : "SELECT * FROM courses WHERE user_id=?";
  db.query(query, [req.session.user_id], (error, result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
