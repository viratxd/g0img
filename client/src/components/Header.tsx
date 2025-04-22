import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Header = () => {
  const { email, userName } = useContext(UserContext);

  return (
    <header>
      <p className="header-login">Logged in as {userName ? userName : email}</p>
      <div className="header-right">
        <nav>
          <ul>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/favorite"}>Favorite</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
          </ul>
        </nav>
        <LogoutButton />
      </div>
    </header>
  );
};
