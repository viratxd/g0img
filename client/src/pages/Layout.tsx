import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "../styles/main.scss";
export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
