import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import icon from "../assets/pin.png";
import bg from "../assets/map.png";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <img
          src={bg}
          alt="background image "
          className="absolute opacity-20 w-full h-full"
        />
        <h1 className="text-8xl font-bold z-10">near here</h1>
        <p className="text-3xl font-karla z-10">see around, be around</p>
        <div className="flex items-center mt-4 z-10">
          <img src={icon} className="w-10 h-10 z-10" alt="Pin Icon" />
          <Link
            to="/create"
            className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm z-10"
          >
            create location
          </Link>
        </div>
      </MainContainer>
    </>
  );
}

export default Home;
