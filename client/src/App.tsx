import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewLocation from "./pages/ViewLocation";
import CreateLocation from "./pages/CreateLocation";
import SearchLocation from "./pages/SearchLocation";
import Session from "./pages/Session";
import Account from "./pages/Account";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("App must be used within an AuthProvider");
  }
  const { loading } = context;
  
  if (loading) return <div></div>;

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<CreateLocation />}></Route>
      <Route path="/location/:locationId" element={<ViewLocation />}></Route>
      <Route path="/search" element={<SearchLocation />}></Route>
      <Route path="/session" element={<Session />}></Route>
      <Route path="/account" element={<Account />}></Route>
    </Routes>
  );
};

export default App;
