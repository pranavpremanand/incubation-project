const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    booked:{
        type:Boolean,
        default:false
    },
    name:{
        type:String
    },
    application:{
        type:mongoose.Schema.Types.ObjectId, ref:'applications'
    }
})

const slot = mongoose.model('slots',slotSchema);
module.exports = slot;