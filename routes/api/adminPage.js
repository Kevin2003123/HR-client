const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const EmployeeData = require('../../models/EmployeeData');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const faker = require('faker');

const { check, validationResult } = require('express-validator');
const { findOne } = require('../../models/User');
const Pending = require('../../models/Pending');
const Completed = require('../../models/Completed');
const { restart } = require('nodemon');

//@route GET api/adminPage/
//@desc Get all employees
// @acces private

router.post('/', async (req, res) => {
  const page = req.body.page;
  const limit = 8;

  const skips = (page - 1) * limit;

  /*const lastemployee = await Employees.findOne().sort({
      date: 1
    });*/
  try {
    const employees = await EmployeeData.find()
      .sort({
        date: -1
      })
      .limit(limit)
      .skip(skips);

    res.json(employees);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/adminPage
//@desc Get the last employee
// @acces private

router.post('/last/employee', async (req, res) => {
  try {
    const employees2 = await EmployeeData.findOne().sort({
      date: 1
    });
    if (!employees2) {
      res.json({});
    }

    res.json(employees2);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route Post api/adminPage/faker/faker/faker
//@desc Create a employee
// @acces private

router.post('/faker/faker/faker', async (req, res) => {
  const ava = faker.image.avatar();
  try {
    // const user = await User.findById(req.user.id).select('-password');
    //Encrypt password

    const pass = '123';
    const salt = await bcrypt.genSalt(10);
    const bpass = await bcrypt.hash(pass, salt);

    const newUser = new User({
      avatar: ava,
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: bpass
    });

    const lastn = faker.name.lastName();

    const user = await newUser.save();

    const newEmployee = new EmployeeData({
      avatar: ava,
      name: user.name,
      lastName: lastn,
      birthday: req.body.birthday,
      email: user.email,
      phone: faker.phone.phoneNumber(),
      mobilePhone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      workPosition: 'Backend Developer',
      fullName: `${user.name} ${lastn}`,
      user: user._id
    });

    const newPending = new Pending({ user: user._id });
    const newCompleted = new Completed({ user: user._id });
    await newPending.save();
    await newCompleted.save();
    const employees = await newEmployee.save();

    //await User.findByIdAndUpdate(user._id, { employeeId: employees._id });
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/adminPage/lastSearch
//@desc Get lastemployee by search
// @acces private
router.post('/lastSearch', async (req, res) => {
  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await EmployeeData.findOne({ fullName: search }).sort({
      date: 1
    });

    if (!employee) {
      res.json({});
    }

    res.json(employee);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route POST api/adminPage/search
//@desc Get a employee by search letters
// @acces private
router.post('/search', async (req, res) => {
  const page = req.body.page;
  const limit = 8;
  const skips = (page - 1) * limit;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await EmployeeData.find({ fullName: search })
      .sort({
        date: -1
      })
      .limit(limit)
      .skip(skips);

    if (!employee) {
      res.json([]);
    }

    res.json(employee);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route Post api/adminPage/edit/employee
//@desc Edit employee
// @acces private
router.post(
  '/edit/employee',

  [
    check('name', 'Name is required').not().isEmpty().trim().escape(),
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
    check('birthday', 'Birthday is required').not().isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .escape(),
    check('phone', 'Phone is required').not().isEmpty().trim().escape(),
    check('mobilePhone', 'MobilePhone is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('address', 'Address is required').not().isEmpty().trim().escape(),
    check('workPosition', 'WorkPosition is required')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erros: errors.array()
      });
    }
    try {
      const updateUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        mobilePhone: req.body.mobilePhone,
        address: req.body.address,
        workPosition: req.body.workPosition,
        fullName: `${req.body.name} ${req.body.lastName}`
      };

      const updateUser2 = {
        name: updateUser.name,
        email: updateUser.email
      };
      const profile = await EmployeeData.findOneAndUpdate(
        {
          user: req.body.employeeId
        },
        {
          $set: updateUser
        },
        {
          new: true
        }
      );
      await User.findOneAndUpdate(
        {
          _id: profile.user
        },
        {
          $set: updateUser2
        },
        {
          new: true
        }
      );

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/adminPage/delete/employee/:employeeId
//@desc DELETE a employee by id
// @acces private
router.delete('/delete/employee/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const employee = await EmployeeData.findOne({ user: employeeId });
    if (!employee) {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    }

    await User.findOneAndRemove({ _id: employeeId });
    await Pending.findOneAndRemove({ user: employeeId });
    await Completed.findOneAndRemove({ user: employeeId });
    await employee.remove();

    res.json({
      msg: 'Employee removed'
    });
  } catch (err) {
    if (err) console.log(err);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/adminPage/assing/search
//@desc Get a employee by search letters for assing
// @acces private
router.post('/assing/search', async (req, res) => {
  const limit = 8;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    if (name !== '') {
      const employee = await EmployeeData.find({ fullName: search })
        .sort({
          date: -1
        })
        .limit(limit);

      if (!employee) {
        return res.status(404).json({
          msg: 'Employees not found'
        });
      }

      res.json(employee);
    } else {
      res.json([]);
    }
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route Post api/adminPage/createUser
//@desc Create a employee
// @acces private

router.post(
  '/createUser',

  [
    check('name', 'Name is required').not().isEmpty().trim().escape(),
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
    check('birthday', 'Birthday is required').not().isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .escape(),
    check('phone', 'Phone is required').not().isEmpty().trim().escape(),
    check('mobilePhone', 'MobilePhone is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('address', 'Address is required').not().isEmpty().trim().escape(),
    check('workPosition', 'WorkPosition is required')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erros: errors.array()
      });
    }
    try {
      // const user = await User.findById(req.user.id).select('-password');

      let email = await User.findOne({
        email: req.body.email
      });
      if (email) {
        return res.status(400).json({
          errors: [
            {
              msg: `User ${email.email} already exist`
            }
          ]
        });
      }
      const pass = '123';
      const salt = await bcrypt.genSalt(10);
      const bpass = await bcrypt.hash(pass, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bpass
      });

      //See if user exists

      const user = await newUser.save();

      const newPending = new Pending({ user: user._id });
      const newCompleted = new Completed({ user: user._id });

      await newPending.save();
      await newCompleted.save();

      const newEmployee = new EmployeeData({
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        mobilePhone: req.body.mobilePhone,
        address: req.body.address,
        workPosition: req.body.workPosition,
        fullName: `${req.body.name} ${req.body.lastName}`,
        user: user._id
      });

      const employees = await newEmployee.save();
      await User.findByIdAndUpdate(user._id, { employeeId: employees._id });

      res.json(employees);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/adminPage/comments
//@desc Get all comments
// @acces private

router.post('/comments', async (req, res) => {
  const employeeId = req.body.employeeId;
  const page = req.body.page;
  const limit = 3;
  const pageSize = limit * page;
  const skips = (page - 1) * limit;

  try {
    const employee = await EmployeeData.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }
    const comments = employee.comments.slice(skips, pageSize);
    if (!comments) {
      res.json([]);
    }
    res.json(comments);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/adminPage/lastComment
//@desc GET last Comment
// @acces private
router.post('/lastComment', async (req, res) => {
  const employeeId = req.body.employeeId;

  try {
    const employee = await EmployeeData.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }
    const lastEmployee = employee.comments.length;

    if (!lastEmployee) {
      res.json({});
    }

    res.json(employee.comments.slice(lastEmployee - 1)[0]);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
