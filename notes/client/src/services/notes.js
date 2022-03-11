import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const getFromUser = (user) => {
  const req = axios.get(`${baseUrl}/${user.username}`);
  return req.then((res) => {
    return res.data;
  });
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

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.then((res) => res.data);
};

const toExport = { getFromUser, setToken, getAll, create, update };
export default toExport;
