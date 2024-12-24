import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
    return (
        <div className="container mx-auto h-screen flex flex-col">
      <Navbar></Navbar>
        <div className="flex-grow">
        <Outlet></Outlet>
        </div>
      <Footer></Footer>
    </div>
    );
};

export default Layout;