require("dotenv").config();
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  console.log( "Token -->", token)

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err,
      });
    }
    req.userId = decoded.id;

    console.log("----Verified User---", decoded);
    console.log("calling-->", next);
    next();
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
