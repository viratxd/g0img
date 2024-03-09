import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <button>Image Search App</button>
      <nav>
        <ul>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/favorite"}>Favorite</NavLink>
        </ul>
      </nav>
    </header>
  );
};
