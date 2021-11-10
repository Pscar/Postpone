import http from './http-common';

export const createSchedule = async (data) => {
  const response = await http.post('/schedule/create', data);
  return response
};
export const updateScheduleById = async (Id, data) => {
  const response = await http.post('/schedule/editbyid', {
    Id: Id,
    Description: data.Description,
    EndTime: data.EndTime,
    Location: data.Location,
    locations: data.locations,
    StartTime: data.StartTime,
    Subject: data.Subject,
    Doc_id: data.Doc_id,
  })
  return response
}
export const deleteScheduleById = async (Id) => {
  const response = await http.delete(`/schedule/deletebyid?Id=${Id}`)
  return response
}
export const getPostPonesById = async (postpone_id) => {
  const response = await http.get(`/postpone/getbyid?postpone_id=${postpone_id}`)
  return response
}
export const getUserAll = async () => {
  const response = await http.get(`/user/get`)
  return response
};

export const getDoctorAll = async () => {
  const response = await http.get(`/doctor/get`)
  return response
}
export const getScheduleAll = async () => {
  const response = await http.get(`/schedule/get`)
  return response
}


//service frontend update
//service frontend create
// export const createPostPoneServeice = async (data) => {
//   const response = await http.post('/postpone/create', data);
//   return response
// };

// export const updatePostPoneById = async (postpone_id, postpones) => {
//   const response = await http.post('/postpone/editbyid', {
//     postpone_id: postpone_id,
//     hn: postpones.hn,
//     firstname: postpones.firstname,
//     lastname: postpones.lastname,
//     locations: postpones.locations,
//     appointments: postpones.appointments,
//     dateOld: postpones.dateOld,
//     dateNew: postpones.dateNew,
//     course: postpones.course,
//     email: postpones.email,
//     phone: postpones.phone,
//     password: postpones.password,
//     confirmPassword: postpones.confirmPassword,
//     status: postpones.status
//   })
//   return response
// }

//service frontend delete

// export const deletePostPonesById = async (postpone_id) => {
//   const response = await http.delete(`/postpone/deletebyid?postpone_id=${postpone_id}`)
//   return response
// }

//service frontend getById + getByNow

// export const getPostPonesNow = async () => {
//   const response = await http.get('/postpone/now');
//   return response
// };

//service frontend getAll

// export const getPostPoneAll = async () => {
//   const response = await http.get(`/postpone/get`)
//   return response
// }

