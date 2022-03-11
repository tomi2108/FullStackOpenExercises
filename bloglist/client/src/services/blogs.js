import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.post(baseUrl, newObject, config);
  return req.then((res) => res.data);
};

const update = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return req.then((res) => res.data);
};

const erase = (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.delete(`${baseUrl}/${obj.id}`, config);
  return req.then((res) => res.data);
};
const toExport = { getAll, create, update, erase, setToken };
export default toExport;
