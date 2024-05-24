const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
  
      // Save the user instance to the database
      await user.save();
  
      let roles;
      if (req.body.roles) {
        roles = await Role.find({ name: { $in: req.body.roles } });
      } else {
        const role = await Role.findOne({ name: "user" });
        roles = [role];
      }
  
      user.roles = roles.map(role => role._id);
      await user.save();
  
      res.status(200).send({ message: "User was registered successfully!" });
    } catch (error) {
      console.error("Error while registering user:", error);
      res.status(500).send({ message: "An error occurred while registering the user." });
    }
  };
  

  // exports.signin = async (req, res) => {
  //   try {
  //     const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");
  
  //     if (!user) {
  //       return res.status(404).send({ message: "User Not found." });
  //     }
  
  //     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
  //     if (!passwordIsValid) {
  //       return res.status(401).send({ message: "Invalid Password!" });
  //     }
  
  //     const token = jwt.sign({ id: user.id }, config.secret, {
  //       algorithm: 'HS256',
  //       expiresIn: 86400, // 24 hours
  //     });
  
  //     const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());
  
  //     req.session.token = token;
  
  //     res.status(200).send({
  //       id: user._id,
  //       username: user.username,
  //       email: user.email,
  //       roles: authorities,
  //     });
  //   } catch (err) {
  //     console.error("Error signing in:", err);
  //     res.status(500).send({ message: "An error occurred while signing in." });
  //   }
  // };
  


  exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
  
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        expiresIn: 86400, // 24 hours
      });
  
      const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());
  
      // Set the token in the session
      req.session.token = token;
  
      // Redirect the user to the protected route
      res.redirect("/api/test/user/wel");
    } catch (err) {
      console.error("Error signing in:", err);
      res.status(500).send({ message: "An error occurred while signing in." });
    }
  };
  




exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};