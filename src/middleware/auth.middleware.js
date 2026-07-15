import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Bypass authentication for local testing using a valid 24-char hex string
  req.admin = { id: "000000000000000000000000" };
  next();
};

export default authMiddleware;


