import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <NavLink to={"/"} className="header-logo">Image Search App</NavLink>
      <nav>
        <ul>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/favorite"}>Favorite</NavLink>
        </ul>
      </nav>
    </header>
  );
};
