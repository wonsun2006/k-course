const express = require("express");
const router = express.Router();
const { connection } = require("../config/mysql.js");
const { checkKeys, createHash } = require("../utils/common.js");
const db = connection.init();
connection.open(db);

router.post("/login", function (req, res) {
  const body = req.body;
  const required_key = ["user_id", "user_password"];
  const insufficient_key = checkKeys(body, required_key);
  if (!insufficient_key) {
    res.status(400).json("아이디 혹은 비밀번호가 입력되지 않았습니다.");
  }
  db.query(
    "SELECT * FROM users WHERE user_id=?",
    [body.user_id],
    (error, rows, fields) => {
      if (error) throw error;
      if (rows === []) {
        res.status(401).json("사용자가 존재하지 않습니다.");
      }
      const result = rows[0];
      if (result.user_password === createHash(body.user_password)) {
        req.session.user_id = result.user_id;
        req.session.user_name = result.user_name;
        req.session.id_num = result.id_num;
        req.session.user_role = result.user_role;
        req.session.save((err) => {
          if (err) res.status(500).json("세션 저장에 실패했습니다.");
          res.status(200).json("로그인 성공했습니다.");
        });
      } else {
        res.status(401).json("아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
    }
  );
});

router.post("/logout", function (req, res) {
  if (req.session.user_id) {
    req.session.destroy((err) => {
      if (err) res.status(500).json("로그아웃에 실패했습니다.");
      res.status(200).json("로그아웃 성공");
    });
  } else {
    res.status(200).json("로그아웃 성공");
  }
});

router.get("/login-check", function (req, res) {
  if (req.session.user_id) {
    res.status(200).json(true);
    console.log("logout");
    res.status(200).json(false);
  }
});

module.exports = router;
