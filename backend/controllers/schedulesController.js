const schedulesService = require('../service/schedulesService');
const doctorsService = require('../service/doctorsService');

exports.createScheduleDoctor = async (req, res) => {

  const {
    description,
    subject,
    location,
    startTime,
    endTime,
    doctorId
  } = req.body;

  try {
    const doctor = await doctorsService.getByID(doctorId);

    const newschedule = await schedulesService.create({
      description: description,
      subject: subject,
      location: location,
      startTime: startTime,
      endTime: endTime,
      doctorId: doctorId,
      doctorName: doctor.doctorName
    });

    return res.status(200).send({
      status: "success",
      data: newschedule
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.getScheduleDoctorAll = async (req, res) => {

  try {
    const schedules = await schedulesService.getAll();

    return res.status(200).send({
      status: "success",
      data: schedules
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.editScheduleByID = async (req, res) => {
  const {
    scheduleId,
    description,
    subject,
    location,
    startTime,
    endTime,
    doctorId
  } = req.body;

  try {
    const doctor = await doctorsService.getByID(doctorId);

    const editschedule = await schedulesService.editByID(scheduleId, {
      scheduleId: scheduleId,
      description: description,
      subject: subject,
      location: location,
      startTime: startTime,
      endTime: endTime,
      doctorId: doctorId,
      doctorName: doctor.doctorName
    });

    return res.status(200).send({
      status: "success",
      data: editschedule
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.deleteScheduleByID = async (req, res) => {

  const scheduleId = req.params.scheduleId;

  try {
    const deleteschedule = await schedulesService.deleteByID(scheduleId);

    return res.status(200).send({
      status: "success",
      data: deleteschedule
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
