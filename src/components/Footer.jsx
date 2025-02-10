import { useSelector } from "react-redux";

function Footer() {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="border-top">
      <footer
        className={`d-flex flex-wrap justify-content-between align-items-center py-3 my-4 container ${
          isDark ? "border-secondary" : ""
        }`}
      >
        <div className="col-md-3 mb-2 mb-md-0 logo-container">
          <a
            href="/"
            className={`link-${isDark ? "light" : "dark"} text-decoration-none`}
          >
            <img
              src={`./${isDark ? "LightGenAi.svg" : "DarkGenAi.svg"}`}
              alt="Logo"
              width="50"
              height="52"
            />
          </a>
          <span className="logo">GenAi© 2025</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a href="/" className={`link-${isDark ? "light" : "dark"}`}>
              <img src="./facebook.svg" alt="Logo" width="25" height="25" />
            </a>
          </li>
          <li className="ms-3">
            <a href="/" className={`link-${isDark ? "light" : "dark"}`}>
              <img src="./instagram.svg" alt="Logo" width="25" height="25" />
            </a>
          </li>
          <li className="ms-3">
            <a href="/" className={`link-${isDark ? "light" : "dark"}`}>
              <img
                src={`./${isDark ? "DarkTwitter" : "twitter"}.svg`}
                alt="Logo"
                width="25"
                height="25"
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
