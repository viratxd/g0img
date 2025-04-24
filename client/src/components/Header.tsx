import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export const Header = () => {
  const { email, userName } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header-desktop">
        <p className="header-desktop__login">
          Logged in as {userName ? userName : email}
        </p>
        <div className="header-desktop__right">
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
      <header className="header-mobile">
        <button
          className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav
          className={`header-mobile__menu ${isMobileMenuOpen ? "open" : ""}`}
        >
          <NavLink to="/" onClick={toggleMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/favorite" onClick={toggleMobileMenu}>
            Favorite
          </NavLink>
          <NavLink to="/profile" onClick={toggleMobileMenu}>
            Profile
          </NavLink>
          <LogoutButton />
        </nav>
      </header>
    </>
  );
};
