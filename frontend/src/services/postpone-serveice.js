import http from './http-common';

export const createPostPones = async (data) => {
  const response = await http.post('/postpone/create', data);
  return response
};

export const getPostPonesNow = async () => {
  const response = await http.get('/postpone/now');
  return response
};


export const updatePostPoneById = async (postpone_id, data) => {
  const response = await http.post('/postpone/editbyid', {
    postpone_id: postpone_id,
    hn: data.hn,
    firstname: data.firstname,
    lastname: data.lastname,
    locations: data.locations,
    appointments: data.appointments,
    dateOld: data.dateOld,
    dateNew: data.dateNew,
    course: data.course,
    email: data.email,
    phone: data.phone,
    password: data.password,
    confirmPassword: data.confirmPassword,
    status: data.status
  })
  return response
}
export const getDoctorAll = async () => {
  const response = await http.get(`/doctor/get`)
  return response
}
export const getScheduleAll =async () => {
  const response = await http.get(`/schedule/get`)
  return response
}
export const deletePostPonesById = async (postpone_id) => {
  const response = await http.delete(`/postpone/deletebyid?postpone_id=${postpone_id}`)
  return response
}
export const getPostPonesById = async (postpone_id) => {
  const response = await http.get(`/postpone/getbyid?postpone_id=${postpone_id}`)
  return response
}
export const getPostPoneAll = async () => {
  const response = await http.get(`/postpone/get`)
  return response
}
export const getUserAll = async () => {
  const response = await http.get(`/user/get`)
  return response
};
