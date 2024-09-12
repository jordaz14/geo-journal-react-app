import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useState } from "react";

function Account() {
  const [isUser, setUser] = useState(true);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {isUser ? (
          <>
            <h1 className="text-4xl font-bold">welcome back</h1>
            <form
              action=""
              className="flex flex-col bg-white rounded-md w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
            >
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
              />
              <label htmlFor="" className="mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
              />
              <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4">
                log in
              </button>
              <p className="text-center mt-2">
                Don't have an account?&nbsp;
                <span
                  className="underline cursor-pointer"
                  onClick={() => {
                    setUser(false);
                  }}
                >
                  Click here
                </span>
              </p>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">welcome</h1>
            <form
              action=""
              className="flex flex-col bg-white rounded-md w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
            >
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
              />
              <label htmlFor="" className="mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
              />
              <label htmlFor="" className="mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
              />
              <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4">
                register
              </button>
              <p className="text-center mt-2">
                Have an account?&nbsp;
                <span
                  className="underline cursor-pointer"
                  onClick={() => {
                    setUser(true);
                  }}
                >
                  Click here
                </span>
              </p>
            </form>
          </>
        )}
      </MainContainer>
    </>
  );
}

export default Account;
