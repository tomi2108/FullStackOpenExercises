import axios from "axios";

const baseUrl = "http://localhost:3003/api/users";

const getByUsername = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`);
  return res.data[0];
};

const toExport = { getByUsername };
export default toExport;
