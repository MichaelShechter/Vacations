const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  image: { type: String, required: false },
  startDate: { type: Date, required: true, default:Date.now() },
  endDate: { type: Date, required: true ,default:Date.now()},
  price: { type: Number, required: true },
  followers: { type: Number }
});

module.exports = mongoose.model("Vacation", vacationSchema);
