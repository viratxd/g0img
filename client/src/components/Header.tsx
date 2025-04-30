import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Logo } from "../assets/Logo";
import { motion } from "framer-motion";

export const Header = () => {
  const { email, userName } = useContext(UserContext);

  return (
    <>
      <header className="header-desktop">
        <p className="header-desktop__login">
          Logged in as {userName ? userName : email}
        </p>
        <motion.a href="/" className="header-desktop__logo">
          <Logo width={45} height={45} />
        </motion.a>
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
        <Logo width={45} height={45} />
      </header>
    </>
  );
};
