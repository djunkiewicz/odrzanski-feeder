const passport = require("passport");
const { Strategy } = require("passport-local");

passport.use(
  "local",
  new Strategy(function verify(username, password, cb) {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let authenticatedUser = { id: 1, name: "admin1" };
      console.log("Correct credentials.");
      return cb(null, authenticatedUser);
    } else {
      console.log("Invalid login or password.");
      return cb(null, false);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = { passport };
