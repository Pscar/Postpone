const SchedulerDoctorService = require('../service/schedule_doctor_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

exports.CreateScheduleDoctor = async (req, res) => {

  const {
    schedule_id,
    startTime,
    endTime,
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
    const CreateNewScheduleDoctor = await SchedulerDoctorService.create({
      schedule_id: schedule_id,
      startTime: startTime,
      endTime: endTime
    });

    return res.status(200).send({
      status: "success",
      data: CreateNewScheduleDoctor
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
