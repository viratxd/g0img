import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Header = () => {
  const { userName } = useContext(AuthContext);

  return (
    <header>
      <p className="header-login">Login as {userName}</p>
      <div className="header-right">
        <nav>
          <ul>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/favorite"}>Favorite</NavLink>
          </ul>
        </nav>
        <LogoutButton />
      </div>
    </header>
  );
};
