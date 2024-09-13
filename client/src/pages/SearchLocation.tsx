import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import VerticalContainer from "../components/VerticalContainer";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";

function SearchLocation() {
  const [coords, setCoords] = useState({ lat: 40.6875646, lng: -73.9940103 });
  const locations = [
    {
      title: "anybody care to share some thoughts?",
      updated: "9/14/24",
      comment: "this is my comment",
      activity: "12 comments",
      isOwner: true,
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <VerticalContainer>
          <h1 className="text-4xl font-bold text-center">
            oh, the places you've been
          </h1>
          <p className="text-xl text-center mt-2">
            see if any others have come along
          </p>
          <div className="w-full flex-1 p-2 bg-white my-4 flex flex-col justify-center rounded-md drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative">
            <MapContainer
              center={[coords.lat as number, coords.lng as number]}
              zoom={13}
              className="w-full h-full bg-white "
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
              />
              <Marker position={[coords.lat as number, coords.lng as number]} />
            </MapContainer>
          </div>
          <p className="text-xl text-center">
            Your location is: {coords.lat} {coords.lng}
          </p>
          <div className="overflow-auto w-full h-[200px] px-2 mt-4">
            <div className="bg-white w-full p-4 rounded-md flex flex-col items-center">
              <h2 className="text-xl text-center font-bold">
                Anybody care to share some thoughts
              </h2>
              <hr />
              <p>Updated 9/12/24</p>
              <div>
                <p>
                  This is going to be my long comments with a lot of commentary,
                  and you're going to wonder why this comment is so long.
                </p>
              </div>
              <p>+12 Comments</p>
              <p>You're the owner of this location. Click here to delete.</p>
            </div>
          </div>
        </VerticalContainer>
      </MainContainer>
    </>
  );
}

export default SearchLocation;
