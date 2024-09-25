import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import VerticalContainer from "../components/VerticalContainer";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { serverUrl, postData, fetchData } from "../utils/fetch";
import { EntryResponse, LocationResponse } from "../types/types";

const ViewLocation = () => {
  const { locationId } = useParams();
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isLoadingLocation, setLoadingLocation] = useState(true);
  const [isLoadingMap, setLoadingMap] = useState(true);
  const [isLocation, setLocation] = useState(false);
  const [isEntry, setEntry] = useState(false);
  const [entryList, setEntryList] = useState([{}]);
  const [coords, setCoords] = useState<{
    lat: null | number;
    lng: null | number;
  }>({ lat: null, lng: null });
  const [formData, setFormData] = useState({ message: "" });
  const [date, setDate] = useState(new Date());

  // HANDLE LOCATION RENDERING ON INITIAL LOAD
  useEffect(() => {
    fetchData(`${serverUrl}/location/${locationId}`).then(
      (response: LocationResponse) => {
        console.log(response);
        setLoadingLocation(false);

        if (response.isLocation) {
          setLocation(true);
          if (response.isEntry) {
            // If location & entry, render 'entry' page
            setEntryList(response.entry);
            setEntry(true);
          }
          // If location & no entry, render 'first entry' page & ask user for coords
          else {
            getCoords();
          }
        }

        // If no location, render 'you got lost' page
      }
    );
  }, [locationId]);

  // HANDLE ENTRY SUBMISSIONS
  function formSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setButtonLoading(true);

    if (!validateClientSideInput()) {
      setButtonLoading(false);
      return;
    }

    const date = new Date();
    setDate(date);

    postData(`${serverUrl}/entry/${locationId}`, {
      date,
      coords,
      formData,
    }).then((entryResponse: EntryResponse) => {
      console.log(entryResponse);

      fetchData(`${serverUrl}/location/${locationId}`).then(
        (locationResponse: LocationResponse) => {
          if (locationResponse.isEntry) {
            // If location & entry, render 'entry' page
            setEntryList(locationResponse.entry);
            setEntry(true);
            setFormData({ message: "" });
          }
        }
      );

      setButtonLoading(false);
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setFormData({ message: capitalized });
    console.log(formData.message);
  }

  function validateClientSideInput() {
    if (formData.message.match(/^\s*$/)) {
      return false;
    }

    return true;
  }

  // GET USER COORDS IF INITIAL LOCATION ENTRY
  function getCoords() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: Math.round(position.coords.latitude * 100) / 100,
            lng: Math.round(position.coords.longitude * 100) / 100,
          });
          setLoadingMap(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  function convertTime(time: string) {
    const date = new Date(time);
    const localTime = date.toLocaleTimeString();
    return localTime;
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {!isLoadingLocation ? (
          isLocation ? (
            <VerticalContainer>
              {isEntry ? (
                <>
                  <div key={0} className="mb-2 w-full">
                    <div className="w-full bg-primary-red p-2 sm:p-4 text-l sm:text-xl text-white font-bold text-center rounded-md drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear">
                      {entryList[0].message}
                    </div>
                  </div>
                  <div
                    id="feed-entry"
                    className="w-full flex-1 flex flex-col mb-4 overflow-y-auto overflow-x-hidden no-scrollbar"
                  >
                    {entryList.map((entry, index) => {
                      const localTime = convertTime(entry.created_at);

                      if (index == 0) {
                        return;
                      } else {
                        return (
                          <div
                    
                            key={index}
                            className="mb-6 w-full"
                          >
                            <div className="w-full flex justify-between px-4">
                              <p className="font-bold">{entry.user.username}</p>
                              <p>Delivered: {localTime}</p>
                            </div>
                            <div className="w-full bg-secondary-red p-4 rounded-md">
                              {entry.message}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              ) : (
                <div
                  id="feed-new-entry"
                  className="w-full flex-1 flex flex-col mb-4"
                >
                  <h1 className="text-4xl font-bold text-center">
                    it's a big world out there
                  </h1>
                  <p className="text-xl text-center mt-2">
                    but you have something to share, <br></br> so what do you
                    say?
                  </p>
                  {!isLoadingMap ? (
                    <>
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
                          <Marker
                            position={[
                              coords.lat as number,
                              coords.lng as number,
                            ]}
                          />
                        </MapContainer>
                      </div>
                      <p className="text-xl text-center">
                        Your location is: &nbsp;
                        {coords.lat > 0 ? (
                          <span>{coords.lat}°N</span>
                        ) : (
                          <span>{coords.lat}°S</span>
                        )}
                        , &nbsp;
                        {coords.lng > 0 ? (
                          <span>{coords.lng}°W</span>
                        ) : (
                          <span>{coords.lng}°E</span>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex-1 p-2 bg-white my-4 flex flex-col justify-center items-center rounded-md drop-shadow-md hover:drop-shadow-2xl transition duration-500 linear relative">
                        <div id="loader"></div>
                      </div>
                      <p className="text-xl text-center">
                        Your location is loading. <br></br> &nbsp;
                      </p>
                    </>
                  )}
                </div>
              )}

              <form id="input" className="w-full" onSubmit={formSubmit}>
                <textarea
                  id="message"
                  name="message"
                  minLength={1}
                  maxLength={140}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full h-[100px] rounded-md p-2 border border-solid border-secondary-gray resize-none"
                />
                <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4 h-[40px] flex justify-center">
                  {isButtonLoading ? (
                    <div id="loader-white"></div>
                  ) : (
                    <p className="font-bold">submit</p>
                  )}
                </button>
              </form>
            </VerticalContainer>
          ) : (
            /* If location not found*/ <>
              <h1 className="text-4xl sm:text-8xl font-bold text-primary-red">
                uh oh
              </h1>
              <p className="text-xl sm:text-4xl font-bold text-center">
                it seems like you got lost, <br></br> let's get you back
              </p>
              <Link
                to="/"
                className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4 font-bold"
              >
                home
              </Link>
            </>
          )
        ) : (
          /* If not loadingLocation */ <div id="loader"></div>
        )}
      </MainContainer>
    </>
  );
};

export default ViewLocation;
