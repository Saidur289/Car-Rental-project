import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/icons8-car-50.png";
import { Tooltip } from "react-tooltip";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { handleSignOut, user } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  // function for user log out
  const handleLogOut = () => {
    handleSignOut()
      .then(() => {
        navigate(location?.state ? "/" : "/");
      })
      .catch((error) => console.log("error", error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/available">Available Cars</NavLink>
      </li>
      
      {user && 
        
          <li>
            <NavLink to="/add-car">Add Car</NavLink>
          </li>
         }
          {
            user && <li>
            <NavLink to="/my-cars">My Cars</NavLink>
          </li>
          }
          {
            user && <li>
            <NavLink to="/my-booking">My Booking</NavLink>
          </li>
          }
        
      
    </>
  );
  return (
    <div className="navbar bg-gradient-to-r from-indigo-500 to-purple-400  text-white fixed container mx-auto backdrop:blur-lg px-3   z-50 top-0 pl-0">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box  mt-3 w-52 p-2 shadow z-50"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl flex gap-1 items-center">
          <img src={logo} className="w-10" alt="" />
          RENT CAR{" "}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end z-10">
  {user && user?.email ? (
    <div className="flex gap-2 items-center">
      {/* Profile Picture or Default Icon */}
      <a
        data-tooltip-id="tooltip-anchor-show"
        data-tooltip-content={user?.displayName || "User"}
        data-tooltip-delay-show={500}
      >
        {user?.photoURL ? (
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL}
            className="w-10 h-10 rounded-full"
            alt={`${user?.displayName || "User"}'s profile`}
          />
        ) : (
          <FaUser className="w-10 h-10 rounded-full text-gray-500" />
        )}
      </a>
      <Tooltip id="tooltip-anchor-show" place="bottom" />{" "}
      
      {/* Log Out Button */}
      <button
        onClick={handleLogOut}
        className="px-5 py-3 rounded-lg border-none bg-gradient-to-r from-blue-700 to-purple-800 text-white hover:from-blue-500 hover:to-purple-600"
      >
        Log Out
      </button>
    </div>
  ) : (
    <Link to="/login">
      <button className="px-5 py-3 rounded-lg border-none bg-gradient-to-r from-blue-700 to-purple-800 text-white hover:from-blue-500 hover:to-purple-600">
        Login
      </button>
    </Link>
  )}
</div>

    </div>
  );
};

export default Navbar;
