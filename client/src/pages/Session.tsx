import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";
import LogInForm from "../components/LogInForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

const Session = () => {
  const [isUser, setUser] = useState(true);

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        {isUser ? (
          <>
            <h1 className="text-4xl font-bold">welcome back</h1>
            <LogInForm isUser={isUser} setUser={() => setUser(false)} />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">welcome</h1>
            <RegisterForm isUser={isUser} setUser={() => setUser(true)} />
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Session;
