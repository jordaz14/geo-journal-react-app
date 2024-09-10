import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

function CreateLocation() {
  const [qrValue, setQRValue] = useState("https://example.org/");

  useEffect(() => {
    const createUrl: string = "http://localhost:5000/create-location";

    const locationId = crypto.randomUUID();

    async function postData(url: string, data: any) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return result;
      } catch (error) {
        console.log(error);
      }
    }

    postData(createUrl, { locationId: locationId }).then((response) => {
      console.log(response);
      const locationUrl: string = `http://localhost:5000/location/${response.locationId}`;
      setQRValue(locationUrl);
    });
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <h1 className="text-4xl font-bold">here's your new spot</h1>
        <p className="text-xl text-center mt-2">
          place it anywhere and say <br></br>something, anything!
        </p>
        <div className="bg-white h-80 w-80 my-4  rounded-md font-bold flex flex-col justify-center items-center drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear ">
          <QRCodeSVG value={qrValue} size={275}></QRCodeSVG>
        </div>
        <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-[100px]">
          Download
        </button>
        <button className="bg-primary-gray text-white py-2 px-4 rounded-md shadow-sm mt-2 w-[100px]">
          Refresh
        </button>
      </MainContainer>
    </>
  );
}

export default CreateLocation;
