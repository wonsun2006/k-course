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
      "SELECT course_id, course_name, professor_id, user_name AS professor_name " +
        "FROM courses LEFT JOIN users ON professor_id=user_id WHERE course_id " +
        "NOT IN (SELECT course_id FROM registration WHERE student_id=? AND (registration_status=-1 OR registration_status=1))",
      [req.session.user_id],
      (error, result) => {
        res.status(200).json(result);
      }
    );
  } else {
    const query =
      req.session.user_role === 0
        ? "SELECT course_id, course_name, professor_id, user_name AS professor_name " +
          "FROM courses LEFT JOIN users ON professor_id=user_id WHERE course_id " +
          "IN (SELECT course_id FROM registration WHERE student_id=?)"
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

router.get("/:course_id/posts", isUser, function (req, res) {
  const { course_id } = req.params;
  db.query(
    "SELECT EXISTS((SELECT course_id FROM courses WHERE course_id=? AND professor_id=?) " +
      "UNION (SELECT course_id FROM registration WHERE course_id=? AND student_id=?)) AS id_exists",
    [course_id, req.session.user_id, course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "SELECT * FROM posts WHERE course_id=?",
          [course_id],
          (error, rows, fields) => {
            if (error) res.status(500).json("게시글 조회에 실패했습니다.");
            res.status(200).json(rows);
          }
        );
      } else {
        res.status(401).json("게시글을 볼 권한이 없습니다.");
      }
    }
  );
});

router.get("/:course_id/posts/:post_id", isUser, function (req, res) {
  const { course_id, post_id } = req.params;
  db.query(
    "SELECT EXISTS((SELECT course_id FROM courses WHERE course_id=? AND professor_id=?) " +
      "UNION (SELECT course_id FROM registration WHERE course_id=? AND student_id=?)) AS id_exists",
    [course_id, req.session.user_id, course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "SELECT * FROM posts WHERE post_id=?",
          [post_id],
          (error, rows, fields) => {
            if (error) res.status(500).json("게시글 조회에 실패했습니다.");
            res.status(200).json(rows[0]);
          }
        );
      } else {
        res.status(401).json("게시글을 볼 권한이 없습니다.");
      }
    }
  );
});

router.post("/:course_id/posts", isProfessor, function (req, res) {
  const { course_id } = req.params;
  const body = req.body;
  const required_key = ["title", "content"];
  const insufficient_key = checkKeys(body, required_key);
  if (!insufficient_key) {
    res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
  }
  db.query(
    "SELECT EXISTS(SELECT * FROM courses WHERE course_id=? AND professor_id=?) AS id_exists",
    [course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "INSERT INTO posts(title, content, edited_time, course_id) VALUES (?,?,NOW(),?)",
          [body.title, body.content, course_id],
          (error, result) => {
            if (error) res.status(500).json("게시글 생성에 실패했습니다.");
            res.status(200).json("게시글이 성공적으로 생성되었습니다.");
          }
        );
      } else {
        res.status(401).json("교수자의 강의가 아닙니다.");
      }
    }
  );
});

// 게시글 수정 API
// router.put("/:course_id/posts/:post_id", isProfessor, function (req, res) {
//   const { course_id, post_id } = req.params;
//   const body = req.body;
//   const required_key = ["title", "content"];
//   const insufficient_key = checkKeys(body, required_key);
//   if (!insufficient_key) {
//     res.status(400).json(insufficient_key + "가 입력되지 않았습니다.");
//   }
//   db.query(
//     "SELECT EXISTS(SELECT * FROM courses WHERE course_id=? AND professor_id=?) AS id_exists",
//     [course_id, req.session.user_id],
//     (error, rows, fields) => {
//       const id_exists = rows[0]["id_exists"];
//       if (id_exists === 1) {
//         db.query(
//           "UPDATE posts SET title=?, content=?, edited_time=NOW() WHERE course_id=? AND post_id=?",
//           [body.title, body.content, course_id, post_id],
//           (error, result) => {
//             if (error) res.status(500).json("게시글 수정에 실패했습니다.");
//             res.status(200).json("게시글을 성공적으로 수정했습니다.");
//           }
//         );
//       } else {
//         res.status(401).json("교수자의 강의가 아닙니다.");
//       }
//     }
//   );
// });

router.delete("/:course_id/posts/:post_id", isProfessor, function (req, res) {
  const { course_id, post_id } = req.params;
  db.query(
    "SELECT EXISTS(SELECT * FROM courses WHERE course_id=? AND professor_id=?) AS id_exists",
    [course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "DELETE FROM posts WHERE course_id=? AND post_id=?",
          [course_id, post_id],
          (error, result) => {
            if (error) res.status(500).json("게시글 삭제에 실패했습니다.");
            res.status(200).json("게시글을 성공적으로 삭제했습니다.");
          }
        );
      } else {
        res.status(401).json("교수자의 강의가 아닙니다.");
      }
    }
  );
});

router.get("/:course_id/students", isProfessor, function (req, res) {
  const { course_id } = req.params;
  db.query(
    "SELECT EXISTS(SELECT * FROM courses WHERE course_id=? AND professor_id=?) AS id_exists",
    [course_id, req.session.user_id],
    (error, rows, fields) => {
      const id_exists = rows[0]["id_exists"];
      if (id_exists === 1) {
        db.query(
          "SELECT * FROM registration LEFT JOIN users ON student_id=user_id WHERE course_id=? AND registration_status=1",
          [course_id],
          (error, result) => {
            if (error) res.status(500).json("수강인원 조회에 실패했습니다.");
            const student_data = result.map((obj) => {
              const newObj = { ...obj };
              delete newObj.user_password;
              return newObj;
            });
            res.status(200).json(student_data);
          }
        );
      } else {
        res.status(401).json("교수자의 강의가 아닙니다.");
      }
    }
  );
});

module.exports = router;
