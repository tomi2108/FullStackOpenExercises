import React, { useEffect, useState } from "react";
import User from "./User";
import userService from "../../services/user.js";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>{users.length} Users </th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <User username={user.username} name={user.name} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
