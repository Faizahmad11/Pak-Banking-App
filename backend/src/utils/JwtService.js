const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secret_key";

class JwtService {

  static generateToken(payload) {
    return jwt.sign(payload, secret, {
      expiresIn: "1d",
      algorithm: "HS256"
    });
  }

  static validateToken(token) {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;