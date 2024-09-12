import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Location() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isLocation, setLocation] = useState(false);
  const [coords, setCoords] = useState<{
    lat: null | number;
    lng: null | number;
  }>({ lat: null, lng: null });

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
      setLoading(false);
      if (response.isLocation) {
        setLocation(true);
        getCoords();
      }
    });
  }, [id]);

  function getCoords() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  const position = [40.69121039464011, -73.98549405341056];

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {!isLoading ? (
          isLocation ? (
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
                <MapContainer
                  center={position}
                  zoom={13}
                  className="w-full flex-1 bg-white  my-6 rounded-md drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative"
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">Carto</a>'
                  />
                  <Marker position={position} />
                </MapContainer>
                {/* 
                <div className="w-80 flex-1 bg-white  my-6 rounded-md drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative">
                  <img
                    src={map}
                    alt="Map Image"
                    className="object-cover w-full h-full rounded-md"
                  />
                  <img
                    src={pin}
                    alt="Pin Icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                  />
                </div>
                */}
                <p className="text-xl text-center">
                  Your location is: {coords.lat} {coords.lng}
                </p>
              </div>
              <div id="input" className="w-full">
                <textarea className="w-full h-[100px] rounded-md p-2 border border-solid border-secondary-gray resize-none" />
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
          )
        ) : (
          <div id="loader"></div>
        )}
      </MainContainer>
    </>
  );
}

export default Location;
