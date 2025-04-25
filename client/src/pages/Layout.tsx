import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "../styles/main.scss";
import { Footer } from "../components/Footer";
export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
