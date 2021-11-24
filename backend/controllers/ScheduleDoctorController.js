const ScheduleDoctorService = require('../service/schedule_doctor_service');
const DoctorService = require('../service/doctor_service');

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
    id,
    description,
    subject,
    location,
    starttime,
    endtime,
    doc_id
  } = req.body;

  try {
    const getDoctor = await DoctorService.getByID(doc_id);

    const editScheduleByID = await ScheduleDoctorService.editByID(id, {
      id: id,
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

  const id = req.params.id;

  try {
    const deleteScheduleByID = await ScheduleDoctorService.DeleteByID(id);

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
