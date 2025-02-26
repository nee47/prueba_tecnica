const jwt = require("jsonwebtoken");

const authVerification = (req, res, next) => {
  try {
    console.log("pasando a verificar");
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "auth denied, no token found",
      });
    }

    console.log(token);
    console.log(process.env.SECRET_JWT_KEY);
    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
      if (err)
        return res.status(403).json({
          error: "invalid token",
        });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authVerification };
