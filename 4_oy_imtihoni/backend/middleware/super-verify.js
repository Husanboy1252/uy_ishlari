// -----------------------------------superadminligini tekshiruvchi

const jwt = require("jsonwebtoken")

const superadmintekshiruvchi = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        message: "Bearer token topilmadi",
      });
    }

    const token = bearerToken.split(" ");
    if (token[0] !== "Bearer") {
      return res.status(401).json({
        message: "Bearer token talab qilinadi",
      });
    }

    if (!token[1]) {
      return res.status(401).json({
        message: "Token topilmadi",
      });
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    if (decode.role !== "superadmin") {
      return res.status(403).json({
        message: "Sen Superadmin emassan",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  superadmintekshiruvchi
};
