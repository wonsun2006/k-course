const mysql = require("mysql2");

const connection = {
  init: function () {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  },
  open: function (con) {
    con.connect((err) => {
      if (err) {
        console.log("MySQL connection failed : ", err);
      } else {
        console.log("MySQL connection succeed");
      }
    });
  },
  close: function (con) {
    con.end((err) => {
      if (err) {
        console.log("MySQL termination failed : ", err);
      } else {
        console.log("MySQL terminated");
      }
    });
  },
};

module.exports = connection;
