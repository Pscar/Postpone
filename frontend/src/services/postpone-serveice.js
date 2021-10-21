import http from './http-common';

const createPostpones = (data) => {
  return http.post('/postpone/create', data);
};
const getUserById = (user_id) => {
  return http.get(`/user/getbyid?user_id=${user_id}`)
}

export default {
  createPostpones,
  getUserById
};