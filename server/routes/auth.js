const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = localStorage.getItem("token");
  if (!token) {
    return res.status(201).json({
      message: "Access denied ! ",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(202).json({
      message: "Invalid token ! ",
    });
  }
};
