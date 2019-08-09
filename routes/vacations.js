const express = require("express");
const router = express.Router();
const Vacations = require("../models/vacation");
const auth = require("../middleware/auth");
const Users = require("../models/users");
const { check, validationResult } = require("express-validator");
const admin = require(`../middleware/admin`);

//@route GET  api/vacations
//@desc  Get  user vacations
//@access Private
router.get("/", auth, async function(req, res, next) {
  console.log("getting vacations");
  try {
    const data = await Vacations.find({});
    //user: req.user
    if (!data) {
      throw new Error("No vactions");
    }
    res.json({ data });
    //res.send(data)
  } catch (err) {
    res.status(400).send(err);
  }
});

//@route POST  api/vacations
//@desc  add  user vacation
//@access Private
//Add the Auth middleware!!

router.post(
  "/",
  auth,
  admin,
  [
    check("name", "Vacation mane is required ")
      .not()
      .isEmpty(),
    check("destination", " destination is required")
      .not()
      .isEmpty(),
    check("startDate", " startDate is required")
      .not()
      .isEmpty(),
    check("endDate", " endDate is required")
      .not()
      .isEmpty(),
    check("price", " endDate is required")
      .not()
      .isEmpty()
  ],
  async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    const {
      name,
      description,
      destination,
      startDate,
      endDate,
      price,
      image
    } = req.body;
    if (req.file) {
      console.log(req.file.originalname);
    }
    try {
      const newVacation = new Vacations({
        name,
        description,
        destination,
        startDate,
        endDate,
        price,
        image,
        user: req.user
      });
      const vacation = await newVacation.save();
      res.json({ vacation });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route  PUT  api/vacations/:id
//@desc   Update vacation
//@access Private

router.put("/:id", auth, admin, async (req, res) => {
  const {
    name,
    description,
    destination,
    startDate,
    endDate,
    price,
    image
  } = req.body.formData;

  //    Build Vacation Obj
  const vacationObj = {};
  if (name) vacationObj.name = name;
  if (description) vacationObj.description = description;
  if (destination) vacationObj.destination = destination;
  if (startDate) vacationObj.startDate = startDate;
  if (endDate) vacationObj.endDate = endDate;
  if (price) vacationObj.price = price;
  if (image) vacationObj.image = image;

  console.log(vacationObj);

  try {
    let vacation = await Vacations.findById(req.params.id);
    if (!vacation) return res.status(400).json({ msg: "Vacation not found" });
    vacation = await Vacations.findByIdAndUpdate(req.params.id, {
      $set: vacationObj
    });
    res.json({ vacation });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE  api/vacations/:id
//@desc   Delete vacation
//@access Private

router.delete("/:id", auth, admin, async function(req, res, next) {
  const { id } = req.params;
  console.log(`Route Delete -> ${id}`);
  try {
    let vacation = await Vacations.findById(req.params.id);
    if (!vacation) return res.status(404).json({ msg: "Vacation  not found" });
    await Vacations.findByIdAndRemove(req.params.id);
    res.json({ id: id, msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }


});


// @route   GET api/vacations/followed
// @desc    get followed vacations
// @access  Private

router.get("/followed", auth, (req, res) => {
  console.log(`in followed route`);
  Vacations.find({ followers: { $gt: 0 } })
      .then(vacations => res.status(200).json(vacations))
      .catch(err => {console.log(err);
      res.status(500)}
      );

});

module.exports = router;
