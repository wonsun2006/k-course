function isUser(req, res, next) {
  if (req.session.user_id) next();
  else return res.status(403).json("로그인이 필요합니다.");
}

module.exports = isUser;
