import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "development-secret";

export function signToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}
