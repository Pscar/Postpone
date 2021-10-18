const InformationsService = require('../service/informations_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

exports.CreateInformation = async (req, res) => {

  const {
    user_id,
    hn,
    firstname,
    lastname,
    locations,
    appointments,
    dateOld,
    dateNew,
    course,
    phone,
    status

  } = req.body;

  try {
    // const getInformationsExist = await InformationsService.getByEmail(email);
    // if(getUserExist){
    //     console.log("User already registered");

    //     return res.status(200).send({
    //         status: "error",
    //         data: "Not Data"
    //       });
    // }else{
    const CreateNewInformations = await InformationsService.create({
      user_id: user_id,
      hn: hn,
      firstname: firstname,
      lastname: lastname,
      locations: locations,
      appointments: appointments,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      phone: phone,
      status: status
    });

    return res.status(200).send({
      status: "success",
      data: CreateNewInformations
    });

    //}   



  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
