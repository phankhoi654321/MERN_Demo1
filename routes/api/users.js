const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load User model
const User = require("../../models/User");

//get secret key
const keys = require("../../config/keys");

//@router   Get api/users/test
//@desc     Test User router
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@router   Post api/users/register
//@desc     Register User router
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email is already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() // this come from mongoose
            .then(user => res.json(user)) // this is the promis
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@router   Post api/users/login
//@desc     Login User router
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }) // email : email but can write only email with es6
    .then(user => {
      // callback with promis
      // Check for User
      if (!user) {
        errors.email = "user not found";
        return res.status(404).json(errors);
      }

      // Check for password
      bcrypt.compare(password, user.password).then(isMatch => { 
        // console.log(isMatch);  // isMatch return true or false
        if (isMatch) {
          // res.json({ msg: "Success" });
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          //  jwt.sign(payload, secretOrPrivateKey, [options, callback])
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token //"Bearer " : user for extracting the JWT from the request fromAuthHeaderAsBearerToken()
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
});

//@router   Get api/users/current
//@desc     Return current User
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success" });
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
