const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check token
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, "secretkey");

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = protect;