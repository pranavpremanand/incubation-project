const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
      const token = req.headers["authorization"].split(" ")[1];
      console.log('TOKEN',token)
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
          console.log('Middleware Error')
          console.log(err)
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        // console.log("USER",decoded)
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (err) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
