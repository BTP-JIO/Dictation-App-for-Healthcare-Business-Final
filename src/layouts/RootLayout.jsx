import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className=" h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
