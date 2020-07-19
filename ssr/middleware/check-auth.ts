const jwt = require("jsonwebtoken");

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY || 'secret');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
