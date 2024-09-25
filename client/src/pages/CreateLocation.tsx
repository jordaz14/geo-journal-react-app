import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { postData } from "../utils/fetch";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState, useRef } from "react";
import { serverUrl, clientUrl } from "../utils/fetch";
import logo from "../assets/nearhere.png";

const CreateLocation = () => {
  const [isLoading, setLoading] = useState(true);
  const [qrValue, setQRValue] = useState("");
  const canvasRef = useRef(null);

  // CREATE INITIAL LOCATION ON LOAD
  useEffect(() => {
    createLocation();
  }, []);

  // HANDLES URL LOCATION CREATION
  function createLocation() {
    // Generate random id
    const locationId = crypto.randomUUID();

    // Post random id to create location & receive processed id
    postData(`${serverUrl}/create-location`, { locationId: locationId }).then(
      (response) => {
        console.log(response);

        setLoading(false);

        // Create location url & append to qr code
        const locationUrl: string = `${clientUrl}/location/${response.locationId}`;
        setQRValue(locationUrl);
      }
    );
  }

  // CREATE NEW QR CODE ON REFRESH
  function handleRefresh() {
    setLoading(true);
    createLocation();
  }

  // DOWNLOAD QR CODE FOR PRINTING
  function downloadQRCode() {
    // Reference QR Canvas element
    const canvas = canvasRef.current.querySelector("canvas");

    // Convert canvas to image
    const image = canvas.toDataURL("image/png");

    // Create link, reference image to link, and click
    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <h1 className="text-2xl sm:text-4xl font-bold">here's your new spot</h1>
        <p className="text-lg sm:text-xl text-center mt-2">
          place it anywhere and say <br></br>something, anything!
        </p>
        <div
          ref={canvasRef}
          className="bg-white h-[275px] w-[275px] my-4 rounded-md font-bold flex flex-col justify-center items-center drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
        >
          {isLoading ? (
            <div id="loader"></div>
          ) : (
            <QRCodeCanvas
              value={qrValue}
              size={250}
              imageSettings={{
                src: logo,
                x: undefined,
                y: undefined,
                height: 50,
                width: 50,
                opacity: 1,
                excavate: true,
              }}
            ></QRCodeCanvas>
          )}
        </div>
        <button
          className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-[120px] font-bold"
          onClick={downloadQRCode}
        >
          download
        </button>
        <button
          className="bg-primary-gray text-white py-2 px-4 rounded-md shadow-sm mt-2 w-[120px] font-bold"
          onClick={handleRefresh}
        >
          refresh
        </button>
      </MainContainer>
    </>
  );
};

export default CreateLocation;
