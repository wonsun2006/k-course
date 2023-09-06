const express = require("express");
const router = express.Router();
const connection = require("../config/mysql.js");
const { checkKeys, createHash } = require("../utils/common.js");
const db = connection.init();
connection.open(db);

// router.get("/", function (req, res) {
//   db.query("SELECT * from users", (error, rows, fields) => {
//     if (error) throw error;
//     res.send(rows);
//   });
// });

router.post("/", function (req, res) {
  const body = req.body;
  const required_key = [
    "user_id",
    "user_password",
    "user_name",
    "id_num",
    "user_role",
  ];
  const insufficient_key = checkKeys(body, required_key);
  if (!insufficient_key) {
    res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
  }
  // ID 존재 여부 확인
  db.query(
    "SELECT EXISTS(SELECT * FROM users WHERE user_id=?) AS id_exists",
    [body.user_id],
    (error, rows, fields) => {
      if (error) throw error;
      const id_exists = rows[0]["id_exists"];
      if (id_exists == 0) {
        // ID 생성
        db.query(
          "INSERT INTO users(user_id, user_password, user_name, id_num, user_role) VALUES (?,?,?,?,?)",
          [
            body.user_id,
            createHash(body.user_password), //비밀번호 단방향 해시
            body.user_name,
            body.id_num,
            body.user_role,
          ],
          (error, result) => {
            res.status(200).json("아이디가 성공적으로 생성되었습니다.");
          }
        );
      } else {
        res.status(403).json("아이디가 중복됩니다.");
      }
    }
  );
});

module.exports = router;
