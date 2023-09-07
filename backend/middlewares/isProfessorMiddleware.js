function isProfessor(req, res, next) {
  if (req.session.user_role === 1) next();
  else return res.status(401).json("교수자가 아닙니다.");
}

module.exports = isProfessor;
