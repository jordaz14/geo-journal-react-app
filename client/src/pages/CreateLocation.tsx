import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

function CreateLocation() {
  useEffect(() => {
    const url: string = "http://localhost:5000/create-location";
    const uniqueId = crypto.randomUUID();
    console.log(uniqueId);
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
        console.log("here's you result...");
        console.log(result.message);
      } catch (error) {
        console.log(error);
      }
    }

    postData(url, { message: "Hello World" });
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <h1 className="text-4xl font-bold">here's your new spot</h1>
        <p className="text-xl text-center mt-2">
          place it anywhere and say <br></br>something, anything!
        </p>
        <div className="bg-white h-80 w-80 my-4 drop-shadow-sm rounded-md font-bold flex flex-col justify-center items-center">
          <QRCodeSVG value="https://example.org/" size={275}></QRCodeSVG>
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
