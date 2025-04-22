import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Profile = () => {
  const { email, userName } = useContext(UserContext);
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-info">
        <p>
          <strong>User Name:</strong> {userName ? userName : email}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <div className="profile-actions"></div>
    </div>
  );
};
