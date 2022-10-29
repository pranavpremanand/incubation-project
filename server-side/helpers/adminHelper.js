const applicationModel = require("../models/applicationModel");
const userModel = require("../models/userModel");
const slotModel = require("../models/slotModel");
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')
//Do admin log
exports.doLogin = (data) =>{
  return new Promise(async(res,rej)=>{
    try{
      const admin = await adminModel.findOne({email:data.email})
      if(admin){
        await bcrypt.compare(data.password,admin.password).then(response=>{
          if(response){
            res(admin)
          }else{
            res()
          }
        }).catch(err=>{
          rej()
        })
      }else{
        res()
      }
    }catch(err){
      console.log(err)
      rej()
    }
  })
}

//Get all applications data
exports.getApplicationsData = () => {
  return new Promise(async (res, rej) => {
    try {
      const applications = await applicationModel.find().lean();
      res(applications);
    } catch (err) {
      rej();
    }
  });
};

//Add to Pending
exports.changeStatus = (userId) => {
  return new Promise(async (res, rej) => {
    try {
      const application = await applicationModel.findOne({ userId: userId });
      if (application.status === "Submitted") {
        await applicationModel.updateOne(
          { userId: userId },
          {
            $set: {
              status: "Pending",
            },
          }
        );
        res({ message: "Added to Pending" });
      } else if (application.status === "Pending") {
        await applicationModel.updateOne(
          { userId: userId },
          {
            $set: {
              status: "Approved",
            },
          }
        );
        res({ message: "Approved" });
      } else if (application.status === "Approved") {
        await applicationModel.updateOne(
          { userId: userId },
          {
            $set: {
              status: "Booked",
            },
          }
        );
        res({ message: "Booked" });
      }
    } catch (error) {
      rej();
    }
  });
};

//Deny application
exports.denyApplication = (userId) => {
  return new Promise(async (res, rej) => {
    try {
      await applicationModel.updateOne(
        { userId: userId },
        {
          $set: {
            status: "Cancelled",
          },
        }
      );
      res(true);
    } catch (error) {
      rej();
    }
  });
};

//Get users
exports.getUsers = () => {
  return new Promise(async (res, rej) => {
    try {
      const allUsers = await userModel.find();
      res(allUsers);
    } catch (err) {
      rej();
    }
  });
};

//Get slots
exports.getSlots = () => {
  const response = {}
  return new Promise(async (res, rej) => {
    try {
      const slots = await slotModel.find().sort({ name: 1 });
      const applications = await applicationModel.find({status:'Approved'})
      response.slots = slots;
      response.applications = applications;
      res(response);
    } catch (err) {
      rej();
    }
  });
};

//Add slot
exports.addSlot = () => {
  return new Promise(async (res, rej) => {
    try {
      const chars = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];

      for (var i = 0; i < chars.length; i++) {
        const name = chars[i];
        const slot = await slotModel.findOne({ name: name });
        if (slot) {
          continue;
        } else {
          const data = {
            name: name,
          };
          const newSlot = new slotModel(data);
          newSlot.save().then(async (response) => {
            let slots = await slotModel.find();
            console.log(slots);
            res(slots);
          });
          break;
        }
      }
    } catch (err) {
      rej(err);
    }
  });
};

//Book slot
exports.bookSlot = (data) =>{
  console.log(data)
  return new Promise(async(res,rej)=>{
    try{
      await applicationModel.updateOne({_id:data.formId},{$set:{status:'Booked'}})
      await slotModel.updateOne({_id:data.slotId},{$set:{booked:true,application:data.formId}})
      res(true)
      console.log('success');
    }catch(err){
      console.log('error');
      rej()
    }
  })
}