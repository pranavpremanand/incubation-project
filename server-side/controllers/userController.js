const userHelper = require('../helpers/userHelper')

exports.submitForm = (req,res,next)=>{
    userHelper.submitForm(req.body)
    console.log(req.body);
}