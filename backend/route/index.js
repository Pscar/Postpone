const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AppointmentsController = require('../controllers/AppointmentsController');
const DoctorController = require('../controllers/DoctorController');
const ScheduleDoctorController = require('../controllers/ScheduleDoctorController');


router.post("/user", UserController.CreateUser);
router.get("/user", UserController.GetUserAll);
router.get("/user/:user_id", UserController.GetUserByID);


router.post("/appointment", AppointmentsController.CreateAppointment);
router.get("/appointment", AppointmentsController.GetAppointmentAll);
router.get("/appointment/now", AppointmentsController.GetAppointmentNow);
router.get("/appointment/:appointments_id", AppointmentsController.GetAppointmentByID);
router.put("/appointment/:appointments_id", AppointmentsController.EditAppointmentByID);
router.delete("/appointment/:appointments_id", AppointmentsController.DeleteAppointmenteByID)


router.get("/doctor", DoctorController.GetDoctorAll);


router.post("/schedule", ScheduleDoctorController.CreateScheduleDoctor);
router.get("/schedule/get", ScheduleDoctorController.GetScheduleDoctorAll);
router.put("/schedule/:schedule_id", ScheduleDoctorController.EditScheduleByID);
router.delete("/schedule/:schedule_id", ScheduleDoctorController.DeleteScheduleByID)

module.exports = router;