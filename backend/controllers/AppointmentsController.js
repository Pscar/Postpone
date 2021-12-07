const appointmentsService = require('../service/appointmentsService');
const patienstService = require('../service/patientsService');
const doctorsService = require('../service/doctorsService');

exports.createAppointment = async (req, res) => {
  const {
    hn,
    email,
    location,
    doctorName,
    dateOld,
    dateNew,
    course,
    status,
  } = req.body;

  try {
    const listDoctorName = await doctorsService.getByName(doctorName);
    const listPatientEmail = await patienstService.getByEmail(email);

    const newappointment = await appointmentsService.create({
      patientId: listPatientEmail.patientId,
      hn: hn,
      location: location,
      doctorId: listDoctorName.doctorId,
      doctorName: doctorName,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      status: status
    });

    return res.status(200).send({
      status: "success",
      data: newappointment
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.getAppointmentAll = async (req, res) => {

  try {
    const appointments = await appointmentsService.getAll();

    return res.status(200).send({
      status: "success",
      data: appointments
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.getAppointmentByID = async (req, res) => {

  const appointmentsId = req.params.appointmentsId;

  try {
    const appointment = await appointmentsService.getByID(appointmentsId);
    return res.status(200).send({
      status: "success",
      data: appointment
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.editAppointmentByID = async (req, res) => {

  const {
    appointmentsId,
    hn,
    location,
    doctorName,
    dateOld,
    dateNew,
    course,
    status
  } = req.body;

  const listDoctorName = await doctorsService.getByName(doctorName);

  try {
    const editappointment = await appointmentsService.editByID(appointmentsId, {
      appointmentsId: appointmentsId,
      hn: hn,
      location: location,
      doctorName: doctorName,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      doctorId: listDoctorName.doctorId,
      status: status
    });
    return res.status(200).send({
      status: "success",
      data: editappointment
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.deleteAppointmenteByID = async (req, res) => {

  const appointmentsId = req.params.appointmentsId;

  try {
    const deleteappointment = await appointmentsService.deleteByID(appointmentsId);

    return res.status(200).send({
      status: "success",
      data: deleteappointment
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}