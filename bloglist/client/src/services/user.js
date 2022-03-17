import axios from "axios";

const baseUrl = "http://localhost:3003/api/users";

const getByUsername = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`);
  return res.data[0];
};
const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const toExport = { getByUsername, getAll };
export default toExport;
