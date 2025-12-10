// admin tekshiruvchi 

const jwt = require("jsonwebtoken");

const tekshiruvchi = (req, res, next) => {
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

    // console.log(decode);
    
 
    if (decode.role !== "admin") {
      return res.status(403).json({
        message: "Sen admin emassan",
        xatolik: "b>m>ad-v"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      xatolik: "login qiling"
    });
  }
};

module.exports = {
  tekshiruvchi
};
