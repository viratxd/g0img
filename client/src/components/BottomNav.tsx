import { NavLink } from "react-router-dom";
import { Icon } from "./Icon";
import { useAuth0 } from "@auth0/auth0-react";

export const BottomNav = () => {
  const { logout } = useAuth0();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="bottom-nav__item">
        <Icon width={25} height={25} name={"home"} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/favorite" className="bottom-nav__item">
        <Icon width={25} height={25} name={"favorite"} />
        <span>Favorite</span>
      </NavLink>
      <NavLink to="/profile" className="bottom-nav__item">
        <Icon width={25} height={25} name={"person"} />
        <span>Profile</span>
      </NavLink>
      <button
        className="bottom-nav__item"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <Icon name="logout" width={25} height={25} />
        <span>Log out</span>
      </button>
    </nav>
  );
};
