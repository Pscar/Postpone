const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const PostPoneController = require('../controllers/PostPoneController');
const DoctorController = require('../controllers/DoctorController');
const ScheduleDoctorController = require('../controllers/ScheduleDoctorController');

// !API 1XX - User

//!API 101 - Create User
router.post("/user/create", UserController.CreateUser);
//!API 102 - Get User All
router.get("/user/get", UserController.GetUserAll);
//!API 103 - Get User By ID
router.get("/user/getbyid", UserController.GetUserByID);
// //!API 104 - Get User By email
router.get("/user/getbyemail", UserController.GetUserByEmail);
// //!API 105 - Edit User By email
router.put("/user/editbyemail", UserController.EditUserByEmail);



// !API 2XX - Postpone

//!API 201 - Create Postpone
router.post("/postpone/create", PostPoneController.CreatePostPone);
//!API 202 - Get Postpone All
router.get("/postpone/get", PostPoneController.GetPostPoneAll);
//!API 202 - Get Postpone Now
router.get("/postpone/now", PostPoneController.GetPostPoneNow);
//!API 203 - Get Postpone By ID
router.get("/postpone/getbyid", PostPoneController.GetPostPoneByID);
// !API 204 - Edit Postpone By ID
router.put("/postpone/editbyid", PostPoneController.EditPostPoneByID);
// !API 205 - Delete Postpone By ID
router.delete("/postpone/deletebyid", PostPoneController.DeletePostPoneID)


//!API 301 - Get Doctor All
router.get("/doctor/get", DoctorController.GetDoctorAll);



// !API 4XX - ScheduleDoctor

//!API 401 - Create ScheduleDoctor
router.post("/schedule/create", ScheduleDoctorController.CreateScheduleDoctor);
//!API 402 - Get ScheduleDoctor All
router.get("/schedule/get", ScheduleDoctorController.GetScheduleDoctorAll);
//!API 403 - Get ScheduleDoctor By ID
router.put("/schedule/editbyid", ScheduleDoctorController.EditScheduleByID);
// !API 404 - Delete ScheduleDoctor By ID
router.delete("/schedule/deletebyid", ScheduleDoctorController.DeleteScheduleByID)

module.exports = router;