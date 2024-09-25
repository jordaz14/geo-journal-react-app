import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import VerticalContainer from "../components/VerticalContainer";
import MapComponent from "../components/MapComponent";
import { AuthContext } from "../context/AuthContext";
import { MapContainer } from "react-leaflet";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData, serverUrl } from "../utils/fetch";

const SearchLocation = () => {
  const [coords, setCoords] = useState({ lat: 40.6875646, lng: -73.9940103 });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchData(`${serverUrl}/user-location`).then((response) => {
        const reversedLocationList = response.reverse();
        setLocationList(reversedLocationList);
        setCoords({
          lat: reversedLocationList[0].location_lat,
          lng: reversedLocationList[0].location_lng,
        });
        setLocationLoading(false);
      });
    }
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {user ? (
          <VerticalContainer>
            <h1 className="text-4xl font-bold text-center">
              oh, the places you've been
            </h1>
            <p className="text-xl text-center mt-2">
              see if any others have come along
            </p>
            <div className="w-full min-h-[200px] max-h-[300px] p-2 bg-white my-4 flex flex-col justify-center rounded-md drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative">
              <MapContainer
                center={[coords.lat as number, coords.lng as number]}
                zoom={13}
                className="w-full h-full bg-white"
              >
                <MapComponent coords={coords}></MapComponent>
              </MapContainer>
            </div>
            <p className="text-xl text-center mb-4">
              Your location is: {coords.lat} {coords.lng}
            </p>
            <div
              id="focus"
              className="overflow-y-auto no-scrollbar w-full flex-1"
            >
              {locations.map((location) => (
                <div
                  onMouseEnter={() =>
                    setCoords({
                      lat: location.coords.lat,
                      lng: location.coords.lng,
                    })
                  }
                  className="bg-white w-full p-4 rounded-md flex flex-col items-center mb-8 border border-solid border-secondary-gray hover:border-primary-gray transition duration-500 linear"
                >
                  <h2 className="text-xl text-center font-bold">
                    {location.title}
                  </h2>
                  <hr className="border-solid border-secondary-gray w-full my-2" />
                  <p>Updated: {location.updated}</p>
                  <div className="bg-red-50 text-center rounded-md my-2 p-2 w-full">
                    <p>{location.comment}</p>
                  </div>
                  <p>{location.activity}</p>
                  <p className="mt-4">
                    You're the owner of this location. Click here to delete.
                  </p>
                </div>
              ))}
            </div>
          </VerticalContainer>
        ) : (
          <>
            <h1 className="text-8xl font-bold text-primary-red">hi there</h1>
            <p className="text-4xl font-bold text-center">
              to access all locations you've visited,<br></br> please
            </p>
            <Link
              to="/session"
              className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4 font-bold"
            >
              log in
            </Link>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default SearchLocation;
