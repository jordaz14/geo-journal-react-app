import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="w-full h-12 bg-white drop-shadow-sm flex align-middle font-lato font-bold text-md">
      <div id="left-nav" className="flex flex-1  px-4">
        <Link to="/" className="flex items-center">
          here
        </Link>
      </div>
      <div id="right-nav" className="flex items-center gap-4 px-4">
        <Link to="/search" className="flex items-center">
          locations
        </Link>
        {user ? (
          <Link
            to="/account"
            className="flex items-center justify-center bg-primary-red text-white py-2 px-4 rounded-md h-[75%] w-[90px]"
          >
            account
          </Link>
        ) : (
          <Link
            to="/session"
            className="flex items-center justify-center bg-primary-red text-white py-2 px-4 rounded-md h-[75%] w-[90px]"
          >
            log in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
