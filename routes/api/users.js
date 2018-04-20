const express = require('express');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const { secretOrKey } = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.get('/test', (req, res, next) => res.json({ msg: 'User Works' }));

router.post('/register', async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravator.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name,
        email,
        avatar
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              console.error(err);
            });
        });
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          errors.password = 'Password incorrect';
          res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.error(er));
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { id, name, email, avatar } = req.user;
    res.json({
      id,
      name,
      email,
      avatar
    });
  }
);

module.exports = router;
