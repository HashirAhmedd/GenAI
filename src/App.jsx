import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

export const SearchContext = createContext()
function App() {
  const [search, setSearch] = useState("");
  const theme = useSelector((state) => state.theme);
  return (
    <>
    <SearchContext.Provider value={{search, setSearch}}>
      <div
        className={` ${
          theme === "dark" ? "bg-dark dark text-light home" : "bg-light text-dark"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <Header setSearch={setSearch} />
        <Outlet search={search} />
        <Footer />
      </div>
      </SearchContext.Provider>
    </>
  );
}

export default App;
