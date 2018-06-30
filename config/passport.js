const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

//https://github.com/themikenicholson/passport-jwt      and passport http://www.passportjs.org/docs/downloads/html/  (configure)
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {      // passport is param will get from server is passport middleware of node (server: import passport from 'passport')
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {          
    //new JwtStrategy(options, verify) || options = opts, verify callback http://www.passportjs.org/docs/downloads/html/
    //jwt_payload get from post user when login, when login will make the sign which jwt.sign(payload, secretOrPrivateKey,[optins, callback])
    //https://github.com/auth0/node-jsonwebtoken
    // console.log(jwt_payload);    // this one will return the jwt_payload
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};