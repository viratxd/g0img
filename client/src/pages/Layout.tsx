import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import "../styles/main.scss";
import { Footer } from "../components/Footer";
import { BottomNav } from "../components/BottomNav";
export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </>
  );
};
