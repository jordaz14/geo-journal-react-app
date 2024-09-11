import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import CreateLocation from "./pages/CreateLocation";
import SearchLocation from "./pages/SearchLocation";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateLocation />}></Route>
        <Route path="/location/:id" element={<Location />}></Route>
        <Route path="/search" element={<SearchLocation />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
