const adminHelper = require("../helpers/adminHelper");
const jwt = require("jsonwebtoken");

//Do admin log
exports.doLogin = (req,res) =>{
  try{
    adminHelper.doLogin(req.body).then(response=>{
      console.log('response is here');
      const token = jwt.sign(
        { id: response._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res
          .status(200)
          .send({ message: "Login success", success: true, data:token});
    }).catch(err=>{
    res.status(500).send({ message: "Error logging in", success: false });
    })
  }catch(err){
    res.status(500).send({ message: "Error logging in", success: false });
  }
}

//Get all applications
exports.getApplicationsData = (req, res) => {
  try {
    adminHelper
      .getApplicationsData()
      .then((response) => {
        res.status(200).send({ success: true, data: response });
      })
      .catch((err) => {
        res.status(500).send({ success: false });
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

//Change status to pending
exports.changeStatus = (req, res) => {
  try {
    adminHelper
      .changeStatus(req.params.id)
      .then((response) => {
        res.status(200).send({ success: true,response });
      })
      .catch((err) => {
        res.status(500).send({ success: false });
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

//Deny Application
exports.denyApplication = (req, res) => {
  try {
    adminHelper
      .denyApplication(req.params.id)
      .then((response) => {
        res.status(200).send({ success: true});
      })
      .catch((err) => {
        res.status(500).send({ success: false });
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

//Get users
exports.getUsers = (req,res) =>{
  try{
    adminHelper.getUsers().then(response=>{
      res.status(200).send({success:true,data:response})
    }).catch(err=>{
      res.status(500).send({success:false})
    })
  }catch(err){
    res.status(500).send({success:false})
  }
}

//Get slots
exports.getSlots = (req,res) =>{
  try{
    adminHelper.getSlots().then(response=>{
      res.status(200).send({success:true,data:response.slots,applications:response.applications})
    })
  }catch(err){
    res.status(500).send({success:false})
  }
}

//Add slot
exports.addSlot = (req,res) =>{
  try{
    adminHelper.addSlot().then(response=>{
      res.status(201).send({success:true,data:response})
    }).catch(err=>{
      res.status(200).send({success:false})
    })
  }catch(err){
    res.status(500).send({success:false})
  }
}

//Book slot
exports.bookSlot = (req,res) =>{
  try{
    adminHelper.bookSlot(req.body).then(response=>{
      res.status(200).send({success:true})
    }).catch(err=>{
      console.log(err)
    })
  }catch(err){
    res.status(500).send({success:false})
  }
}