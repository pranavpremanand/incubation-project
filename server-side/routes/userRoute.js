const express = require("express");
const router = express.Router();
const userHelper = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/user");
const userModel = require("../models/userModel");
const userController = require("../controllers/userController");
const applicationModel = require("../models/applicationModel");

//SIGNUP
router.post("/signup", (req, res, next) => {
  userHelper
    .doSignup(req.body)
    .then((response) => {
      if (response) {
        res
          .status(200)
          .send({ message: "User created successfully!", success: true });
      } else {
        res
          .status(200)
          .send({ message: "User already exist!", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error creating user!", success: false, err });
    });
});

//LOGIN
router.post("/login", async (req, res, next) => {
  try {
    userHelper.doLogin(req.body).then((response) => {
      if (response.status) {
        const token = jwt.sign(
          { id: response.user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res
          .status(200)
          .send({ message: "Login success", success: true, data:token});
      } else if (response.failed) {
        res
          .status(200)
          .send({ message: "Entered password is incorrect", success: false });
      } else {
        res
          .status(200)
          .send({ message: "User does not exist", success: false });
      }
    });
  } catch (err) {
    console.log("Error",err);
    res.status(500).send({ message: "Error logging in", success: false });
  }
});

//GET USER DATA
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    console.log('hello',req.body)
    const user = await userModel.findOne({ _id: req.body.userId });
    const applicationIn = await applicationModel.findOne({userId:req.body.userId})
    console.log("USER",user)
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      if(applicationIn){
        return res.status(200).send({
          success: true,
          data: {
            name: user.name,
            email: user.email,
            application:true,
            applicationStatus:applicationIn.status
          },
        });
      }else{
        return res.status(200).send({
          success: true,
          data: {
            name: user.name,
            email: user.email,
            application:false
          },
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting the user info", success: false, error });
  }
});

//SUBMIT FORM
router.post('/application', authMiddleware, userController.submitForm)
module.exports = router;
