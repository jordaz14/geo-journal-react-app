import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("log out");
    localStorage.removeItem("token");
    navigate("/session");
  };

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <p>Welcome to your account!</p>
        <button
          onClick={handleLogout}
          className="flex items-center bg-primary-red text-white py-2 px-4 rounded-md shadow-sm mt-4"
        >
          log out
        </button>
      </MainContainer>
    </>
  );
}

export default Account;
