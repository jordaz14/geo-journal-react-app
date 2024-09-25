import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Account must be used within an AuthProvider");
  }
  const { logout } = context;
  const [isButtonLoading, setButtonLoading] = useState(false);

  // Logout user with AuthContext logout
  async function handleLogout() {
    setButtonLoading(true);
    await logout();
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <p className="text-2xl sm:text-4xl font-bold text-center">
          Welcome to your account!
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4 font-bold h-[40px] w-[100px] justify-center"
        >
          {isButtonLoading ? <div id="loader-white"></div> : <p>log out</p>}
        </button>
      </MainContainer>
    </>
  );
};

export default Account;
