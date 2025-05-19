import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

function Tutorials() {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="tutorials-container">
      <Helmet>
        <title>AI Tutorials – GenAI Pro</title>
        <meta
          name="description"
          content="Explore AI tutorials and educational resources at GenAI Pro. Coming soon!"
        />
      </Helmet>
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">COMING SOON</h1>
        <p className="coming-soon-tagline">AI Tutorials will be listed here</p>
        <div className="coming-soon-illustration">
          <div className="torch">
            <div className="handle"></div>
            <div className="torch-head">
              <div className="flame"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
