const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const applicationModel = require("../models/applicationModel");
const adminModel = require("../models/adminModel");

//DO USER SIGNUP
exports.doSignup = async (data) => {
  try {
    const userExist = await userModel.findOne({ email: data.email });
    if (!userExist) {
      const bcrypted = await bcrypt.hash(data.password, 10);
      data.password = bcrypted;
      const newUser = new userModel(data);
      await newUser.save();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

//DO USER LOGIN
exports.doLogin = (data) => {
  return new Promise(async (res, rej) => {
    const response = {};
    try {
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        const userApplicationData = await applicationModel.findOne({userId:user._id})
        bcrypt
          .compare(data.password, user.password)
          .then((status) => {
            if (status) {
              if(userApplicationData){
                response.applicationStatus = userApplicationData.status;
              }
              response.status = true;
              response.user = user;
              res(response);
            } else {
              response.status = false;
              response.failed = true;
              res(response);
            }
          })
          // .catch((err) => {
          //   console.log(err)
          //   rej(true);
          // });
      } else {
        res(false);
      }
    } catch (err) {
      console.log('ERROR',err);
      rej(false);
    }
  });
};

//SUBMIT FORM
exports.submitForm = (data) => {
  return new Promise((res, rej) => {
    try {
      console.log(data);
      let date = new Date();
        date = date.toUTCString();
        date = date.slice(5, 16);
      data.date = date;
      const newApplication = new applicationModel(data);
      newApplication.save();
      res(true);
    } catch (err) {
      rej();
    }
  });
};
