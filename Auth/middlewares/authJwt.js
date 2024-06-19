const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = async (req, res, next) => {
  try {
    let token = req.session.token;

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
   isModerator,
};
module.exports = authJwt;
