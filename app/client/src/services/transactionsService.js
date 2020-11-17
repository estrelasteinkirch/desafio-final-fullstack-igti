import http from "../http-common.js";

const getPeriod = (yearMonth) => {
  return http.get(`?period=${yearMonth}`);
};

const create = (data) => {
  return http.post("/new", data);
};

const update = (id, data) => {
  return http.put(`/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/${id}`);
};

const removeAll = () => {
  return http.delete("/");
};

const filter = (name) => {
  return http.get("/");
};

export default {
  getPeriod,
  create,
  update,
  remove,
  removeAll,
  filter,
};
