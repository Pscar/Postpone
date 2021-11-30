const AppointmentService = require('../service/appointmentsService');
const PatientService = require('../service/patientService');
const DoctorService = require('../service/doctorService');

exports.CreateAppointment = async (req, res) => {
  const {
    hn,
    email,
    locations,
    doctor_name,
    dateOld,
    dateNew,
    course,
    status,
  } = req.body;

  try {
    const getDoctorByName = await DoctorService.getByName(doctor_name);
    const getPatientAccountByEmail = await PatientService.getByEmail(email);

    const createAppointment = await AppointmentService.create({
      patient_id: getPatientAccountByEmail.patient_id,
      hn: hn,
      locations: locations,
      doc_id: getDoctorByName.doc_id,
      doctor_name: doctor_name,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      status: status
    });

    return res.status(200).send({
      status: "success",
      data: createAppointment
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetAppointmentNow = async (req, res) => {

  try {
    const getAppointmentNow = await AppointmentService.getByIdNow();

    return res.status(200).send({
      status: "success",
      data: getAppointmentNow
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetAppointmentByID = async (req, res) => {

  const appointments_id = req.params.appointments_id;

  try {
    const getAppointmentID = await AppointmentService.getByID(appointments_id);

    return res.status(200).send({
      status: "success",
      data: getAppointmentID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetAppointmentAll = async (req, res) => {

  try {
    const getAppointmentAll = await AppointmentService.getAll();

    return res.status(200).send({
      status: "success",
      data: getAppointmentAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.EditAppointmentByID = async (req, res) => {

  const {
    appointments_id,
    hn,
    locations,
    doctor_name,
    dateOld,
    dateNew,
    course,
    status
  } = req.body;
  console.log("🚀 ~ file: appointmentsController.js ~ line 111 ~ exports.EditAppointmentByID= ~ req.body", req.body)

  const getDoctorByName = await DoctorService.getByName(doctor_name);

  try {
    const editAppointmentByID = await AppointmentService.editByID(appointments_id, {
      appointments_id: appointments_id,
      hn: hn,
      locations: locations,
      doctor_name: doctor_name,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      doc_id: getDoctorByName.doc_id,
      status: status
    });
    return res.status(200).send({
      status: "success",
      data: editAppointmentByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeleteAppointmenteByID = async (req, res) => {

  const appointments_id = req.params.appointments_id;

  try {
    const deleteAppointmenteByID = await AppointmentService.DeleteByID(appointments_id);

    return res.status(200).send({
      status: "success",
      data: deleteAppointmenteByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}