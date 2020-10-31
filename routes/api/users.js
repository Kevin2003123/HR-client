const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

//@route POST api/users
//@desc Register user
// @acces Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists

      let user = await User.findOne({
        email: email
      });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: `User ${email} already exist`
            }
          ]
        });
      }

      user = new User({
        name,
        email,
        password
      });
      //Encrypt password
      const salt = (user.password = await bcrypt.genSalt(10));
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
