import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getFromUser = async (user) => {
  const res = await axios.get(`${baseUrl}/get/${user.username}`);
  return res.data;
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return res.data;
};

const erase = async (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.delete(`${baseUrl}/${obj.id}`, config);
  return res.data;
};

const toExport = { getFromUser, getAll, create, update, erase, setToken };
export default toExport;
