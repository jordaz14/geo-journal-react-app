import { Link } from "react-router-dom";

function NavBar() {
  const isLoginToken: string | null = localStorage.getItem("token");

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
        {isLoginToken ? (
          <Link
            to="/account"
            className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md h-[75%] "
          >
            account
          </Link>
        ) : (
          <Link
            to="/session"
            className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md h-[75%]"
          >
            log in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
