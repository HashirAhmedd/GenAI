import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-dark dark text-light" : "bg-light text-dark"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <Header />
        <ArticleList />
        <Footer />
      </div>
    </>
  );
}

export default App;
