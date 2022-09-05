const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "secret+key");
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ err: "Invalid token" });
    }
    return next();
  }
  return res.status(403).json({ err: "Access token required" });
};

module.exports = verifyToken;
