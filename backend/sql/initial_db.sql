# K COURSE DB 생성
CREATE DATABASE IF NOT EXISTS k_course_db;

USE k_course_db;

# K COURSE Table 생성
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(255),
  user_password VARCHAR(255),
  user_name VARCHAR(255),
  id_num VARCHAR(255),
  user_role INT,
  PRIMARY KEY (user_id));
  
CREATE TABLE IF NOT EXISTS courses (
  course_id INT AUTO_INCREMENT,
  course_name VARCHAR(255),
  edited_time DATETIME,
  professor_id VARCHAR(255),
  PRIMARY KEY (course_id),
  FOREIGN KEY (professor_id) REFERENCES users(user_id) ON DELETE CASCADE);
  
CREATE TABLE IF NOT EXISTS posts (
  post_id INT AUTO_INCREMENT,
  title VARCHAR(255),
  content TEXT,
  edited_time DATETIME,
  course_id INT,
  PRIMARY KEY (post_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE);
  
CREATE TABLE IF NOT EXISTS registration (
  registration_id INT AUTO_INCREMENT,
  student_id VARCHAR(255),
  course_id INT,
  registration_status INT,
  edited_time DATETIME,
  PRIMARY KEY (registration_id),
  FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE);
  