import axios from "axios";
import { useEffect, useState } from "react";

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState([]);

  let token = null;
  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  useEffect(() => {
    async function getAll() {
      if (resource.length === 0) {
        const resp = await axios.get(baseUrl);
        setResource(resp.data);
      }
    }
    getAll();
  }, [resource, baseUrl]);

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };
    const res = await axios.post(baseUrl, newObject, config);
    setResource([...resource, res.data]);
    return res.data;
  };

  const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl} /${id}`, newObject);
    setResource(resource.map((r) => (r.id === id ? res.data : r)));
    return res.data;
  };

  return [resource, { create, update, setToken }];
};
