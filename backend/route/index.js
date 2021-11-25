const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patientController');
const AppointmentsController = require('../controllers/appointmentsController');
const DoctorController = require('../controllers/doctorController');
const ScheduleDoctorController = require('../controllers/scheduleDoctorController');


router.post("/user", PatientController.CreatePatient);
router.get("/user", PatientController.GetPatientAll);
router.get("/user/:user_id", PatientController.GetPatientByID);


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