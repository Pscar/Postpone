const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patientController');
const AppointmentsController = require('../controllers/appointmentsController');
const DoctorController = require('../controllers/doctorController');
const ScheduleDoctorController = require('../controllers/scheduleDoctorController');


router.post("/patients", PatientController.CreatePatient);
router.get("/patients", PatientController.GetPatientAll);
router.get("/patients/:patient_id", PatientController.GetPatientByID);


router.post("/appointments", AppointmentsController.CreateAppointment);
router.get("/appointments", AppointmentsController.GetAppointmentAll);
router.get("/appointments/now", AppointmentsController.GetAppointmentNow);
router.get("/appointments/:appointments_id", AppointmentsController.GetAppointmentByID);
router.put("/appointments/:appointments_id", AppointmentsController.EditAppointmentByID);
router.delete("/appointments/:appointments_id", AppointmentsController.DeleteAppointmenteByID)


router.get("/doctors", DoctorController.GetDoctorAll);


router.post("/schedules", ScheduleDoctorController.CreateScheduleDoctor);
router.get("/schedules", ScheduleDoctorController.GetScheduleDoctorAll);
router.put("/schedules/:schedule_id", ScheduleDoctorController.EditScheduleByID);
router.delete("/schedules/:schedule_id", ScheduleDoctorController.DeleteScheduleByID)

module.exports = router;