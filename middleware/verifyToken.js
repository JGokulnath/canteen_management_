const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const getUserDetails = async (userId) => {
    try {
      const response = await User.getUserStatus(userId);
      return response;
    } catch (err) {
      throw "err";
    }
  };
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "secret+key");
      // decoded - { "user":"roopantj7@gmail.com", "iat":166777, "exp":122121 }
      req.user = decoded;

      getUserDetails(decoded.user).then((response) => {
        req.user = {
          ...req.user,
          isAdmin: response.isAdmin,
          verified: response.verified,
        };
        return next();
      });
    } catch (err) {
      return res.status(401).json({ err: "Invalid token" });
    }
  } else return res.status(403).json({ err: "Access token required" });
};

module.exports = verifyToken;
