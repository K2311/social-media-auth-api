const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/facebook`,
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
