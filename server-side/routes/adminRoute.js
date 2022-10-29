var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

//ADMIN LOGIN
router.post('/',adminController.doLogin)

//GET APPLICATION LIST
router.post('/get-applications-list',adminController.getApplicationsData)

//CHANGE STATUS TO PENDING
router.get('/change-status/:id',adminController.changeStatus)

//DENY APPLICATION
router.get('/deny-application/:id',adminController.denyApplication)

//GET ALL USERS
router.get('/get-users',adminController.getUsers)

//GET ALL SLOTS
router.get('/slots',adminController.getSlots)

//ADD SLOT
router.get('/add-slot',adminController.addSlot)

//BOOK SLOT
router.post('/book-slot',adminController.bookSlot)

module.exports = router;
