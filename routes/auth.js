require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/callback/google',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const user = req.user.profile;
      const token = jwt.sign({ id: user.id, email: user.emails[0].value }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      //res.json({ token, user });
      res.render('dashboard', {
        user: { id: user.id, email: user.emails[0].value, name: user.displayName },
        token
    });
    }
  );


  router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));


  router.get(
  '/callback/facebook',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const user = req.user.profile;
    const token = jwt.sign({ id: user.id, name: user.displayName }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    //res.json({ token, user });
    res.render('dashboard', {
      user: { id: user.id, email: user.emails ? user.emails[0].value : 'N/A', name: user.displayName },
      token
  })
  }
);

  module.exports=router;