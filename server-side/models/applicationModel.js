const mongoose = require("mongoose")

const application = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    companyName: {
      type: String,
    },
    logo: {
      type: String,
    },
    teamAndManagement: {
      type: String,
    },
    productsAndCompanyProfile: {
      type: String,
    },
    problem: {
      type: String,
    },
    uniqueSolution: {
      type: String,
    },
    status: {
      type: String,
      default: "Submitted",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    date:{
      type:String
    }
  },
  { timestamps: true }
);
const Application = mongoose.model("application", application);

module.exports = Application;