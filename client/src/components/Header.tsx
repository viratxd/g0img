import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export const Header = () => {
  return (
    <header>
      <NavLink to={"/"} className="header-logo">Image Search App</NavLink>
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
