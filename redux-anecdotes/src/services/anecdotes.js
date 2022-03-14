import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};

const create = async (anecdote) => {
  const resp = await axios.post(baseUrl, anecdote);
  return resp.data;
};

const update = async (anecdote) => {
  const resp = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return resp.data;
};

const toExport = { getAll, create, update };
export default toExport;
