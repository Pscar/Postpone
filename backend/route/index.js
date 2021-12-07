const express = require('express');
const router = express.Router();

const PatientsController = require('../controllers/patientsController');
const AppointmentsController = require('../controllers/appointmentsController');
const DoctorsController = require('../controllers/doctorsController');
const SchedulesController = require('../controllers/schedulesController');


router.post("/patients", PatientsController.createPatient);
router.get("/patients", PatientsController.getPatientAll);
router.get("/patients/:patientId", PatientsController.getPatientByID);


router.post("/appointments", AppointmentsController.createAppointment);
router.get("/appointments", AppointmentsController.getAppointmentAll);
router.get("/appointments/:appointmentsId", AppointmentsController.getAppointmentByID);
router.put("/appointments/:appointmentsId", AppointmentsController.editAppointmentByID);
router.delete("/appointments/:appointmentsId", AppointmentsController.deleteAppointmenteByID)


router.get("/doctors", DoctorsController.getDoctorAll);


router.post("/schedules", SchedulesController.createScheduleDoctor);
router.get("/schedules", SchedulesController.getScheduleDoctorAll);
router.put("/schedules/:scheduleId", SchedulesController.editScheduleByID);
router.delete("/schedules/:scheduleId", SchedulesController.deleteScheduleByID)

module.exports = router;