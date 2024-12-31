const passport = require("passport");
const { Strategy } = require("passport-local");

passport.use(
  "local",
  new Strategy(function verify(username, password, cb) {
    if (
      username === process.env.TEST_USERNAME &&
      password === process.env.TEST_PASSWORD
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
  console.log("---> serializing user");
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  console.log("---> deserializing user");
  cb(null, user);
});

module.exports = { passport };
