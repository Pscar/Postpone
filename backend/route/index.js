const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AppointmentsController = require('../controllers/AppointmentsController');
const DoctorController = require('../controllers/DoctorController');
const ScheduleDoctorController = require('../controllers/ScheduleDoctorController');


router.post("/user", UserController.CreateUser);
router.get("/user", UserController.GetUserAll);
router.get("/user/:user_id", UserController.GetUserByID);


router.post("/postpone", AppointmentsController.CreateAppointment);
router.get("/postpone", AppointmentsController.GetAppointmentAll);
router.get("/postpone/now", AppointmentsController.GetAppointmentNow);
router.get("/postpone/:appointments_id", AppointmentsController.GetAppointmentByID);
router.put("/postpone/:appointments_id", AppointmentsController.EditAppointmentByID);
router.delete("/postpone/:appointments_id", AppointmentsController.DeleteAppointmenteByID)


router.get("/doctor", DoctorController.GetDoctorAll);


router.post("/schedule", ScheduleDoctorController.CreateScheduleDoctor);
router.get("/schedule/get", ScheduleDoctorController.GetScheduleDoctorAll);
router.put("/schedule/:id", ScheduleDoctorController.EditScheduleByID);
router.delete("/schedule/:id", ScheduleDoctorController.DeleteScheduleByID)

module.exports = router;