import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = await axios.post(baseUrl, newObject, config);
  return req.then((res) => res.data);
};

const update = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return req.then((res) => res.data);
};

const erase = async (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = await axios.delete(`${baseUrl}/${obj.id}`, config);
  return req.then((res) => res.data);
};

const toExport = { getAll, create, update, erase, setToken };
export default toExport;
