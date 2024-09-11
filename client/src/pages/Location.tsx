import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import map from "../assets/map.png";
import pin from "../assets/pin.png";
import { Link } from "react-router-dom";

function Location() {
  const { id } = useParams();
  const [isLocation, setLocation] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const locationUrl = "http://localhost:5000/location/";
    async function fetchData() {
      try {
        const response = await fetch(`${locationUrl}${id}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then((response) => {
      console.log(response);
      if (response.isLocation) {
        setLocation(true);
      }
    });
  }, [id]);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {isLocation ? (
          <div
            id="vertical-container"
            className="w-[500px] h-full flex flex-col items-center py-6 px-2"
          >
            <div
              id="feed"
              className=" w-full flex-1 flex flex-col mb-4 items-center justify-center"
            >
              <h1 className="text-4xl font-bold text-center">
                it's a big world out there
              </h1>
              <p className="text-xl text-center mt-2">
                but you have something to share, <br></br> so what do you say?
              </p>
              <div className="w-80 h-80 bg-white  my-6 rounded-full drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative">
                <img
                  src={map}
                  alt="Map Image"
                  className="object-cover w-full h-full rounded-full"
                />
                <img
                  src={pin}
                  alt="Pin Icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                />
              </div>
              <p className="text-xl text-center">Your location is:</p>
            </div>
            <div id="input" className="w-full">
              <textarea className="w-full h-40 rounded-md p-2 border border-solid border-secondary-gray resize-none" />
              <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-8xl font-bold text-primary-red">uh oh</h1>
            <p className="text-4xl font-bold text-center">
              it seems like you got lost, <br></br> let's get you back
            </p>
            <Link
              to="/"
              className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4"
            >
              Home
            </Link>
          </>
        )}
      </MainContainer>
    </>
  );
}

export default Location;
