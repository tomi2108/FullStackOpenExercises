import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import userService from "../../services/user";
import PersonalBlogList from "../Blogs/PersonalBlogList";

const Profile = () => {
  const [user, setUser] = useState({});
  const match = useMatch("/user/:username");

  useEffect(() => {
    userService.getByUsername(match.params.username).then((res) => {
      setUser(res);
    });
  }, [match.params.username]);

  if (!user) return null;

  return (
    <div>
      <h1>
        {user.name}
        {"'"}s profile
      </h1>
      <h3>Username: {user.username}</h3>
      <PersonalBlogList username={user.username} />
    </div>
  );
};

export default Profile;
