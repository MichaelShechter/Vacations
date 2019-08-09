// import Vacations from "../../client-vacation/src/Components/Vacations/Vacations";

var express = require("express");
var router = express.Router();
const config  = require('config');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Vacations = require("../models/vacation");
const Users = require("../models/users");
const auth = require("../middleware/auth");

//@route  GET api/users
//@desc   Get logged in user
//@access  Private
router.get("/", auth, async (req, res) => {
  console.log(`logged in user route - > `);
  try {
    const user = await Users.findById(req.user).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error });
  }
});

//@route  POST  user/auth
//@desc   auth  user & get token
//@access Public
router.post(
  "/login",
  [
    check("userName", "User name is requird")
      .not()
      .isEmpty(),

    check(
      "password",
      "Please enter a password between 8 to 12 charachters"
    ).isLength({ min: 8, max: 12 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'invalid input ' });
    }
    const { userName, password } = req.body;
    // console.log(userName, password);

    try {
      const user = await Users.findOne({ userName: userName });
      console.log(user);
      if (!user)
        return res.status(400).json({ msg: "Invalid user or password" });
      // check if pass is correct
      const passwordTest = await user.checkPassword(password);
      if (!passwordTest)
        return res.status(400).json({ msg: "Invalid user or password" });
      const payload = {
        user: {
          id: user._id
        }
      };
      jwt.sign(
        payload,
        // config.jwtSecret
          config.get('jwtSecret') ,
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token }).status(200);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
  }
);

// @route  POST URL/users/register
// @desc   Resister a user
//@access  public
router.post(
  "/register",
  [
    check("firstName", "First name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 12 }),
    check("lastName", "Last name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 12 }),
    check("userName", "User name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 12 }),
    check(
      "password",
      "Please enter a password between 8 to 12 characters"
    ).isLength({ min: 8, max: 12 })
  ],
  async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, userName, password } = req.body;
    try {
      let user = await Users.findOne({ userName });
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }
      user = new Users({
        firstName,
        lastName,
        userName,
        password
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
          config.get('jwtSecret')
        // config.jwtSecret
          ,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token }).status(200);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);


// @route   GET  api/users/follow/
// @desc   Get all followed   vacations for user
// @access  Private


router.get("/follow/", auth, (req, res) => {
    Users.findOne({_id:req.user}).select('followOn').populate('followOn')
        .then(data => {
            // console.log(data.followOn);
                res.status(200).json({data})
            })
});

// @route   PUT api/users/follow/:id
// @desc   Add vacation  as follow to the current user
// @access  Private

router.put("/follow/:id", auth, (req, res) => {
    console.log(req.params.id);

    Users.findOne({
        _id: req.user,
        followOn: {$elemMatch: {_id: req.params.id}}
        // followOn:{_id: req.params.id}
    })
        .then(result => {
            if (result) {
                return res.status(400).json({msg:'This user already follow this vacation'});
            } else {
                Users.findOneAndUpdate({_id: req.user}, {$push: {followOn: {_id: req.params.id}}})
                    .then(() => {
                        Users.findOne({
                            _id: req.user
                        })
                            .then(follow => {
                                Vacations.updateOne({_id: req.params.id}, {$inc: {followers: 1}}, {new: true})
                                    .then(() => {
                                        res.status(200).json({msg:'you following this vacation'});
                                    });
                            });
                    })
            }
        })

});


// @route   DELETE  api/users/follow/:id
// @desc   Delete vacation  as follow to the current user
// @access  Private
router.delete("/follow/:id", auth,  (req, res) => {
  console.log(`Delete follow  route -> ${req.user}`);
    Users.findOneAndUpdate({_id: req.user}, {$pull: {followOn: req.params.id}})
        .then(() => {
            Users.findOne({
                _id: req.user
            })
                .then(follow => {
                    Vacations.updateOne({_id: req.params.id}, {$inc: {followers: -1}}, {new: true})
                        .then(() => {
                            res.status(200).json({msg:'You stop following this vacation'})
                        });
                });
        })

});

module.exports = router;
