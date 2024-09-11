import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";

function Location() {
  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <div
          id="vertical-container"
          className="w-[600px] h-full flex flex-col items-center py-6 px-2"
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
      </MainContainer>
    </>
  );
}

export default Location;
