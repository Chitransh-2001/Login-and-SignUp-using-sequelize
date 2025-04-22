const jwt = require("jsonwebtoken");
const JWT_SECRET = "fndsnfsdfndfdsdf";
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token Required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.name = decoded.name;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid and expired token" });
  }
}
module.exports = authenticate;
