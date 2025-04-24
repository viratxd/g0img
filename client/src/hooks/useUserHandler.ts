import { useEffect, useState } from "react";
import { IUserContext } from "../contexts/UserContext";
import { putUserDataToDB } from "../services/userService";

export const useUserHandler = (initUser: IUserContext) => {
  const [userInfo, setUserInfo] = useState<IUserContext>(initUser);

  useEffect(() => {
    setUserInfo(initUser);
  }, [initUser]);

  const updateUserName = (newUserName: string) => {
    setUserInfo((prev) => ({
      ...prev,
      userName: newUserName,
    }));

    putUserDataToDB(userInfo.id, newUserName);
  };

  return { userInfo: { ...userInfo, updateUserName }, setUserInfo };
};
