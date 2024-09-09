import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import icon from "../assets/pin.png";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div
        id="body-container"
        className="flex-1 flex flex-col justify-center items-center"
      >
        <h1 className="text-8xl font-bold">near here</h1>
        <p className="text-3xl font-karla">see around, be around</p>
        <div className="flex items-center mt-4">
          <img src={icon} className="w-10 h-10" alt="Pin Icon" />
          <Link
            to="/create"
            className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm"
          >
            Create Location
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
