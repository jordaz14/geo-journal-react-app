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
  interface AuthContextType {
    user: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }

  const { loading } = useContext(AuthContext) as AuthContextType;
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
