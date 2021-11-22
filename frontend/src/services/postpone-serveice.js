import http from './http-common';

export const getPostPonesById = async (postpone_id) => {
  const response = await http.get(`/postpone/getbyid?postpone_id=${postpone_id}`)
  return response
}
