const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const EmployeeData = require('../../models/EmployeeData');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const faker = require('faker');

const { check, validationResult } = require('express-validator');
const { findOne, update } = require('../../models/User');
const Pending = require('../../models/Pending');
const Completed = require('../../models/Completed');
const { restart } = require('nodemon');

//@route POST api/assigment/pending
//@desc POST Assing employee to pending
// @acces private
router.post('/pending', async (req, res) => {
  const employeeId = req.body.employeeId;
  const reviewerId = req.body.assingId;
  console.log(reviewerId);
  try {
    const employee = await EmployeeData.findOne({ user: employeeId });
    reviewerId.map(async (id) => {
      const assingEmployees = await Pending.findOne({ user: id });
      /*
      if (!employee) {
        return res.status(404).json({
          msg: 'Employee not found'
        });
      }

      if (!assingEmployees) {
        return res.status(404).json({
          msg: 'assing Employee not found'
        });
      }
      */
      const newPending = {
        user: employee.user,
        avatar: employee.avatar,
        fullName: employee.fullName,
        workPosition: employee.workPosition
      };

      //console.log(employee.pending.some(employee=> employee.completed === false && employee.employeeId.toString() === assingId));

      if (
        assingEmployees.pending.some(
          (employee) =>
            employee.isCompleted === false &&
            employee.user.toString() === employeeId
        ) === false
      ) {
        assingEmployees.pending.unshift(newPending);

        employee.pendingReviews.unshift({ user: assingEmployees });
        await assingEmployees.save();
        await employee.save();
      } else {
        /*
        return res.status(400).json({
          msg: `${assingEmployees.name} has been assigned To and has not yet been evaluated`
        });

        */
      }
    });

    res.json('success');
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send(err);
  }
});

//@route POST api/assigment/completed
//@desc POST Assing  pending employee to completed
// @acces private
router.post(
  '/completed',
  [
    check('attitude', 'attitude is required').not().contains(0).not().isEmpty(),
    check('communication', 'communication is required')
      .not()
      .contains(0)
      .not()
      .isEmpty(),
    check('growth', 'growth is required').not().contains(0).not().isEmpty(),
    check('dependability', 'dependability is required')
      .not()
      .contains(0)
      .not()
      .isEmpty(),
    check('productivity', 'productivity is required')
      .not()
      .contains(0)
      .not()
      .isEmpty(),
    check('initiative', 'initiative is required')
      .not()
      .contains(0)
      .not()
      .isEmpty(),
    check('innovation', 'innovation is required')
      .not()
      .contains(0)
      .not()
      .isEmpty(),
    check('comment', 'comment is required').not().isEmpty().trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const employeeId = req.body.employeeId;
    const assingId = req.body.assingId;
    const {
      attitude,
      communication,
      growth,
      dependability,
      productivity,
      initiative,
      innovation,
      comment
    } = req.body;

    const result =
      (attitude +
        communication +
        growth +
        dependability +
        productivity +
        initiative +
        innovation) /
      7;

    var result2 = 0;
    var attitude2 = 0;
    var communication2 = 0;
    var growth2 = 0;
    var dependability2 = 0;
    var productivity2 = 0;
    var initiative2 = 0;
    var innovation2 = 0;
    var totalRating;
    var totalAttitude;
    var totalCommunication;
    var totalGrowth;
    var totalDependability;
    var totalProductivity;
    var totalInitiative;
    var totalInnovation;

    try {
      const pendingData = await Pending.findOne({ user: employeeId });
      const completeData = await Completed.findOne({ user: employeeId });
      const evaluation = await EmployeeData.findOne({ user: assingId });
      const employee = await EmployeeData.findOne({ user: employeeId });

      if (!pendingData) {
        return res.status(404).json({
          msg: 'Employee not found'
        });
      }

      if (!completeData) {
        return res.status(404).json({
          msg: 'Employee not found'
        });
      }

      if (!evaluation) {
        return res.status(404).json({
          msg: 'assing Employee not found'
        });
      }
      const newCompleted = {
        user: evaluation.user,
        avatar: evaluation.avatar,
        fullName: evaluation.fullName,
        workPosition: evaluation.workPosition,
        skills: {
          attitude,
          communication,
          growth,
          dependability,
          productivity,
          initiative,
          innovation,

          result: result
        },
        comment: comment
      };

      const addcomments = {
        user: employee.user,
        avatar: employee.avatar,
        fullName: employee.fullName,
        workPosition: employee.workPosition,
        comment: comment
      };

      const addReview = {
        user: employeeId,
        attitude,
        communication,
        growth,
        dependability,
        productivity,
        initiative,
        innovation,

        result: result
      };

      completeData.completed.unshift(newCompleted);
      completeData.save();

      evaluation.completedReviews.unshift({ user: employeeId });
      evaluation.comments.unshift(addcomments);
      evaluation.skills.unshift(addReview);

      evaluation.save();

      /*
      
      completed.completed.filter(employee => employee.user.toString() === assingId)
*/

      await Pending.findOneAndUpdate(
        {
          user: employeeId,
          pending: { $elemMatch: { isCompleted: false, user: assingId } }
        },
        { $set: { 'pending.$.isCompleted': true } }
      );

      //update skill
      evaluation.skills.map(
        (employee) => (result2 = result2 + employee.result)
      );

      totalRating = result2 / evaluation.skills.length;

      evaluation.skills.map(
        (employee) => (attitude2 = attitude2 + employee.attitude)
      );
      evaluation.skills.map(
        (employee) => (communication2 = communication2 + employee.communication)
      );
      evaluation.skills.map(
        (employee) => (growth2 = growth2 + employee.growth)
      );
      evaluation.skills.map(
        (employee) => (dependability2 = dependability2 + employee.dependability)
      );
      evaluation.skills.map(
        (employee) => (productivity2 = productivity2 + employee.productivity)
      );
      evaluation.skills.map(
        (employee) => (initiative2 = initiative2 + employee.initiative)
      );
      evaluation.skills.map(
        (employee) => (innovation2 = innovation2 + employee.innovation)
      );

      totalAttitude = attitude2 / evaluation.skills.length;
      totalCommunication = communication2 / evaluation.skills.length;
      totalGrowth = growth2 / evaluation.skills.length;
      totalDependability = dependability2 / evaluation.skills.length;
      totalProductivity = productivity2 / evaluation.skills.length;
      totalInitiative = initiative2 / evaluation.skills.length;
      totalInnovation = innovation2 / evaluation.skills.length;

      const totalResult = {
        attitude: totalAttitude,
        communication: totalCommunication,
        growth: totalGrowth,
        dependability: totalDependability,
        productivity: totalProductivity,
        initiative: totalInitiative,
        innovation: totalInnovation,
        result: totalRating
      };
      await EmployeeData.findOneAndUpdate(
        { user: assingId },
        { $set: { skill: totalResult } },
        { new: true }
      );

      res.json('set');

      //evaluation.skills.update(addReview);

      /*
      const filter = pendingData.pending.filter(
        (employee) =>
          (employee.user.toString() === assingId &&
            employee.isCompleted === false) === false
      );
      const filter2 = employee.pending.filter(
        (employee) =>
          (employee.employeeId.toString() === assingId &&
            employee.completed === false) === true
      );
      const complete = filter2[0];
      complete['completed'] = true;

      const updatePending = filter.concat(complete);

      //res.json(updatePending);

      await Employees.findByIdAndUpdate(employeeId, { pending: updatePending });

      employee.completed.push(newCompleted);
      assingEmployee.reviews.push(addReview);
      await employee.save();
      await assingEmployee.save();
      res.json(assingEmployee);

      */
    } catch (err) {
      if (err) console.log(err);
      res.status(500).send('Server error');
    }
  }
);
//@route GET api/assigment/get/pendings
//@desc Get all employees
// @acces private

router.post('/get/pendings', async (req, res) => {
  const employeeId = req.body.employeeId;
  const page = req.body.page;
  const limit = 8;
  const pageSize = limit * page;
  const skips = (page - 1) * limit;
  /*const lastemployee = await Employees.findOne().sort({
      date: 1
    });*/
  try {
    const employees = await Pending.findOne({ user: employeeId });

    if (!employees) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }

    res.json(
      employees.pending
        .filter((employee) => employee.isCompleted !== true)
        .slice(skips, pageSize)
    );
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assigment/last/pending
//@desc Get the last employee
// @acces private

router.post('/last/pending', async (req, res) => {
  try {
    const employees2 = await Pending.findOne({
      user: req.body.employeeId
    });
    if (!employees2) {
      res.json({});
    }

    const last = employees2.pending
      .filter((employee) => employee.isCompleted !== true)
      .reverse()[0];
    if (last) {
      res.json(last);
    } else {
      res.json({});
    }
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/get/completed
//@desc GET Assing completed employees
// @acces private
router.post('/get/completed', async (req, res) => {
  const employeeId = req.body.employeeId;
  const page = req.body.page;
  const limit = 8;
  const pageSize = limit * page;
  const skips = (page - 1) * limit;

  try {
    const employee = await Completed.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }

    res.json(employee.completed.slice(skips, pageSize));
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/last/completed
//@desc GET Assing Last completed employees
// @acces private
router.post('/last/completed', async (req, res) => {
  const employeeId = req.body.employeeId;

  try {
    const employee = await Completed.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }
    const lastEmployee = employee.completed.length;

    res.json(employee.completed.slice(lastEmployee - 1)[0]);
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/search/completed
//@desc GET completed employees by search
// @acces private
router.post('/search/completed', async (req, res) => {
  const employeeId = req.body.employeeId;
  const page = req.body.page;
  const limit = 8;
  const pageSize = limit * page;
  const skips = (page - 1) * limit;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await Completed.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }

    res.json(
      employee.completed
        .sort((a, b) => b.date - a.date)
        .slice(skips, pageSize)
        .filter((employee) => employee.fullName.match(search))
    );
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/search/lastCompleted
//@desc GET completed employees by search
// @acces private
router.post('/search/lastCompleted', async (req, res) => {
  const employeeId = req.body.employeeId;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await Completed.findOne({ user: employeeId });

    if (!employee) {
      return res.json({});
    }
    const lastEmployee = employee.completed
      .sort((a, b) => b.date - a.date)
      .filter((employee) => employee.fullName.match(search)).length;

    const employeeSearch = employee.completed
      .sort((a, b) => b.date - a.date)
      .filter((employee) => employee.fullName.match(search))
      .slice(lastEmployee - 1);

    if (!employeeSearch[0]) {
      res.json({});
    } else {
      res.json(employeeSearch[0]);
    }
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/search/pending
//@desc GET  pending employees by search
// @acces private
router.post('/search/pending', async (req, res) => {
  const employeeId = req.body.employeeId;
  const page = req.body.page;
  const limit = 8;
  const pageSize = limit * page;
  const skips = (page - 1) * limit;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await Pending.findOne({ user: employeeId });

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }

    res.json(
      employee.pending
        .sort((a, b) => b.date - a.date)
        .filter((employee) => employee.isCompleted !== true)
        .slice(skips, pageSize)
        .filter((employee) => employee.fullName.match(search))
    );
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/search/lastPending
//@desc GET  lastPending employees by search
// @acces private
router.post('/search/lastPending', async (req, res) => {
  const employeeId = req.body.employeeId;

  const name = req.body.fullName;
  var search = new RegExp(name, 'i');

  try {
    const employee = await Pending.findOne({ user: employeeId });

    if (!employee) {
      return res.json({});
    }
    const lastEmployee = employee.pending
      .sort((a, b) => b.date - a.date)
      .filter((employee) => employee.isCompleted !== true)
      .filter((employee) => employee.fullName.match(search)).length;

    const employeeSearch = employee.pending
      .sort((a, b) => b.date - a.date)
      .filter((employee) => employee.isCompleted !== true)
      .filter((employee) => employee.fullName.match(search))
      .slice(lastEmployee - 1);
    if (!employeeSearch[0]) {
      res.json({});
    } else {
      res.json(employeeSearch[0]);
    }
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

//@route GET api/assignment/rating/result
//@desc GET  employees ratings
// @acces private
router.post('/rating/result', async (req, res) => {
  const employeeId = req.body.employeeId;

  try {
    const employee = await EmployeeData.findOne({ user: employeeId });
    var result = 0;
    var attitude = 0;
    var communication = 0;
    var growth = 0;
    var dependability = 0;
    var productivity = 0;
    var initiative = 0;
    var innovation = 0;
    var totalRating;
    var totalAttitude;
    var totalCommunication;
    var totalGrowth;
    var totalDependability;
    var totalProductivity;
    var totalInitiative;
    var totalInnovation;

    if (!employee) {
      return res.status(404).json({
        msg: 'Employees not found'
      });
    }

    if (employee.skills.length > 0) {
      employee.skills.map((employee) => (result = result + employee.result));

      totalRating = result / employee.skills.length;

      employee.skills.map(
        (employee) => (attitude = attitude + employee.attitude)
      );
      employee.skills.map(
        (employee) => (communication = communication + employee.communication)
      );
      employee.skills.map((employee) => (growth = growth + employee.growth));
      employee.skills.map(
        (employee) => (dependability = dependability + employee.dependability)
      );
      employee.skills.map(
        (employee) => (productivity = productivity + employee.productivity)
      );
      employee.skills.map(
        (employee) => (initiative = initiative + employee.initiative)
      );
      employee.skills.map(
        (employee) => (innovation = innovation + employee.innovation)
      );

      totalAttitude = attitude / employee.skills.length;
      totalCommunication = attitude / employee.skills.length;
      totalGrowth = attitude / employee.skills.length;
      totalDependability = attitude / employee.skills.length;
      totalProductivity = attitude / employee.skills.length;
      totalInitiative = attitude / employee.skills.length;
      totalInnovation = attitude / employee.skills.length;

      const totalResult = {
        attitude: totalAttitude,
        communication: totalCommunication,
        growth: totalGrowth,
        dependability: totalDependability,
        productivity: totalProductivity,
        initiative: totalInitiative,
        innovation: totalInnovation,
        result: totalRating
      };
      await EmployeeData.findOneAndUpdate(
        { user: employeeId },
        { $set: { skill: totalResult } },
        { new: true }
      );

      res.json(totalResult);
    } else {
      res.json({
        totalRating: 0,
        attitude: 0,
        communication: 0,
        growth: 0,
        dependability: 0,
        productivity: 0,
        initiative: 0,
        innovation: 0,
        comments: comments
      });
    }
  } catch (err) {
    if (err) console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
