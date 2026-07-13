const jwt = require('jsonwebtoken');

/**
 * Reads the JWT from the httpOnly cookie named "token",
 * verifies it, and attaches the decoded payload to req.user.
 * Returns 401 if the token is missing, invalid, or expired.
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies && req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token. Please log in.' });
  }
};

module.exports = authMiddleware;
