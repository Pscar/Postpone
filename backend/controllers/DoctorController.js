const DoctorService = require('../service/doctor_service');

exports.GetDoctorByName = async (req, res) => {

  const doctor_name = req.query.name;

  try {
    const getDoctorByName = await DoctorService.getByID(doctor_name);

    return res.status(200).send({
      status: "success",
      data: getDoctorByName
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetDoctorAll = async (req, res) => {

  try {
    const getDoctorAccountAll = await DoctorService.getAll();

    return res.status(200).send({
      status: "success",
      data: getDoctorAccountAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
