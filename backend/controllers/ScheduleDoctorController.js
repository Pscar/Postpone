const ScheduleDoctorService = require('../service/scheduleDoctorService');
const DoctorService = require('../service/doctorService');

exports.CreateScheduleDoctor = async (req, res) => {

  const {
    description,
    subject,
    location,
    starttime,
    endtime,
    doc_id
  } = req.body;

  try {
    const getDoctor = await DoctorService.getByID(doc_id);

    const createNewScheduleDoctor = await ScheduleDoctorService.create({
      description: description,
      subject: subject,
      location: location,
      starttime: starttime,
      endtime: endtime,
      doc_id: doc_id,
      doctor_name: getDoctor.doctor_name
    });

    return res.status(200).send({
      status: "success",
      data: createNewScheduleDoctor
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetScheduleDoctorAll = async (req, res) => {

  try {
    const getScheduleAll = await ScheduleDoctorService.getAll();

    return res.status(200).send({
      status: "success",
      data: getScheduleAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.EditScheduleByID = async (req, res) => {
  const {
    schedule_id,
    description,
    subject,
    location,
    starttime,
    endtime,
    doc_id
  } = req.body;

  try {
    const getDoctor = await DoctorService.getByID(doc_id);

    const editScheduleByID = await ScheduleDoctorService.editByID(schedule_id, {
      schedule_id: schedule_id,
      description: description,
      subject: subject,
      location: location,
      starttime: starttime,
      endtime: endtime,
      doc_id: doc_id,
      doctor_name: getDoctor.doctor_name
    });

    return res.status(200).send({
      status: "success",
      data: editScheduleByID
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeleteScheduleByID = async (req, res) => {

  const schedule_id = req.params.schedule_id;

  try {
    const deleteScheduleByID = await ScheduleDoctorService.DeleteByID(schedule_id);

    return res.status(200).send({
      status: "success",
      data: deleteScheduleByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
