const doctorsService = require('../service/doctorsService');

exports.getDoctorByName = async (req, res) => {

  const doctorName = req.query.name;

  try {
    
    const listDoctorName = await doctorsService.getByID(doctorName);

    return res.status(200).send({
      status: "success",
      data: listDoctorName
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.getDoctorAll = async (req, res) => {

  try {
    const doctors = await doctorsService.getAll();

    return res.status(200).send({
      status: "success",
      data: doctors
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
