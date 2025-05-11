import { useDispatch, useSelector } from "react-redux";
import { ThemeActions } from "../store/Theme";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    dispatch(ThemeActions.toggleTheme());
  };

  return (
    <>
      <div
        className={`header fixed-top ${
          isDark ? "dark-bg " : "light-shadow light-bg"
        }`}
      >
        <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
          <div className="col-md-3 mb-2 mb-md-0 logo-container">
            <NavLink
              to="/"
              className={`link-${
                isDark ? "light" : "dark"
              } text-decoration-none`}
            >
              <img
                src={`/${isDark ? "LightGenAi.svg" : "DarkGenAi.svg"}`}
                alt="Logo"
                width="50"
                height="52"
              />
            </NavLink>
            <span className="logo">GenAI Pro</span>
          </div>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                to="/"
                className={`nav-link fs-5 px-2 link-${
                  isDark ? "light" : "dark"
                }`}
              >
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tools"
                className={`nav-link fs-5 px-2 link-${
                  isDark ? "light" : "secondary"
                }`}
              >
                Tools
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutorials"
                className={`nav-link fs-5 px-2 link-${
                  isDark ? "light" : "secondary"
                }`}
              >
                Tutorials
              </NavLink>
            </li>
          </ul>
          <div className="col-md-4 text-end d-flex gap-2 align-items-center">
            <div className="d-flex gap-2 flex-grow-1">
              <input
                type="search"
                className={`form-control ${
                  isDark ? "bg-dark text-light border-secondary" : ""
                }`}
                placeholder="Search Article..."
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={`btn btn-${isDark ? "light" : "dark"} ms-2`}
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
      </div>
      <div style={{ height: "80px" }}></div>
    </>
  );
}

export default Header;
