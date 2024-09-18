import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const { logout } = useContext(AuthContext);

  // Logout user with AuthContext logout
  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <p>Welcome to your account!</p>
        <button
          onClick={handleLogout}
          className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4 font-bold"
        >
          log out
        </button>
      </MainContainer>
    </>
  );
};

export default Account;
