import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next((new Error("You are not authenticated").status = 401));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next((new Error("Token is invalid").status = 403));
    req.user = user;
    next();
  });
};
