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
  const required_key = ["course_name"];
  const insufficient_key = checkKeys(body, required_key);
  if (!insufficient_key) {
    res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
  }
  db.query(
    "INSERT INTO courses(course_name, professor_id, edited_time) VALUES (?,?,NOW())",
    [body.course_name, req.session.user_id],
    (error, result) => {
      res.status(200).json("강의가 성공적으로 생성되었습니다.");
    }
  );
});

router.get("/", isUser, function (req, res) {
  const params = req.query;
  if (params.registration === "false") {
    db.query(
      "SELECT * FROM courses WHERE course_id NOT IN (" +
        "SELECT course_id FROM registration WHERE student_id=? AND (registration_status=-1 OR registration_status=1))",
      [req.session.user_id],
      (error, result) => {
        res.status(200).json(result);
      }
    );
  } else {
    const query =
      req.session.user_role === 0
        ? "SELECT * FROM courses LEFT JOIN registration ON courses.course_id=registration.course_id WHERE student_id=?"
        : "SELECT * FROM courses WHERE professor_id=?";
    db.query(query, [req.session.user_id], (error, result) => {
      res.status(200).json(result);
    });
  }
});

router.delete("/:course_id", isProfessor, function (req, res) {
  db.query(
    "SELECT EXISTS(SELECT * FROM courses WHERE course_id=? AND professor_id=?) AS id_exists",
    [req.params.course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "DELETE FROM courses WHERE course_id=?",
          [req.params.course_id],
          (error, result) => {
            if (error) console.log(error);
            res.status(200).json("성공적으로 삭제되었습니다.");
          }
        );
      } else {
        res.status(401).json("교수자의 강의가 아닙니다.");
      }
    }
  );
});

module.exports = router;
