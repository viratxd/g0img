import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export const Profile = () => {
  const { email, userName, updateUserName } = useContext(UserContext);
  const [editableUserName, setEditableUserName] = useState(userName);
  const [isEditing, setIsEditing] = useState(false);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableUserName(e.target.value);
  };

  const toggleEditing = () => {
    if (isEditing && updateUserName) {
      const newUserName = editableUserName.trim() || email;
      updateUserName(newUserName);
      setEditableUserName(newUserName);
    }
    setIsEditing(!isEditing);
  };

  /* TODO: Avatar? */
  /* TODO: Reset password (get link from Auth0?) */

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile__content">
        <div className="username">
          <p>
            <strong>User Name: </strong>
            {isEditing ? (
              <input
                type="text"
                value={editableUserName}
                onChange={handleUserNameChange}
              />
            ) : (
              <span>{userName ? userName : email}</span>
            )}
          </p>

          {isEditing ? (
            <span className="material-symbols-outlined" onClick={toggleEditing}>
              save
            </span>
          ) : (
            <span className="material-symbols-outlined" onClick={toggleEditing}>
              edit
            </span>
          )}
        </div>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};
