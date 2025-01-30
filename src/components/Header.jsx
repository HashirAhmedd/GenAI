function Header() {
  return (
    <>
      <div className=" header fixed-top bg-white shadow-sm">
        <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ">
          <div className="col-md-3 mb-2 mb-md-0 logo-container">
            <a href="/" className="link-body-emphasis text-decoration-none">
              <img
                src="./src/assets/GenAi.svg"
                alt="Logo"
                width="50"
                height="52"
              />
            </a>
            <span className="logo">GenAi</span>
          </div>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Articles
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Tools
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Tutorials
              </a>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <div className="d-flex gap-2">
              <input
                type="search"
                className="form-control flex-grow-1"
                placeholder="Search Article..."
                aria-label="Search"
              />
              <button type="button" className="btn btn-secondary">
                Search
              </button>
            </div>
          </div>
        </header>
      </div>
      <div style={{ height: "80px" }}></div>
    </>
  );
}

export default Header;
