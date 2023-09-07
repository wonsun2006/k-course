const express = require("express");
const router = express.Router();
const { connection } = require("../config/mysql.js");
const { checkKeys, createHash } = require("../utils/common.js");
const isUser = require("../middlewares/isUserMiddleware.js");
const db = connection.init();
connection.open(db);

router.post("/", isUser, function (req, res) {
  if (req.session.user_role === 0) {
    const body = req.body;
    const required_key = ["course_id"];
    const insufficient_key = checkKeys(body, required_key);
    if (!insufficient_key) {
      res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
    }
    db.query(
      "SELECT * FROM registration WHERE user_id=? AND course_id=?",
      [req.session.user_id, body.course_id],
      (error, result) => {
        if (error) res.status(500).json("Server Error");
        if (result[0]) {
          const status = result[0].registration_status;
          switch (status) {
            case -1:
              res.status(401).json("이 강의가 수강 금지 상태입니다.");
              break;
            case 1:
              res.status(400).json("이미 수강중인 강의입니다.");
              break;
            case 0:
              db.query(
                "INSERT INTO registration(user_id, course_id, registration_status, edited_time) VALUES (?,?,1,NOW())",
                [req.session.user_id, body.course_id],
                (error, result) => {
                  res.status(200).json("수강 신청 성공했습니다.");
                }
              );
              break;
          }
        } else {
          db.query(
            "INSERT INTO registration(user_id, course_id, registration_status, edited_time) VALUES (?,?,1,NOW())",
            [req.session.user_id, body.course_id],
            (error, result) => {
              res.status(200).json("수강 신청 성공했습니다.");
            }
          );
        }
      }
    );
  } else if (req.session.user_role === 1) {
    // 교수자가 수강생 관리하는 코드
    // const body = req.body;
    // const required_key = ["course_id","user_id"];
    // const insufficient_key = checkKeys(body, required_key);
    // if (!insufficient_key) {
    //   res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
    // }
  }
});

module.exports = router;
