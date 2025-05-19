import { Helmet } from "react-helmet-async";

function Tools() {
  return (
    <div className="tools-container">
      <Helmet>
        <title>AI Tools – GenAI Pro</title>
        <meta
          name="description"
          content="Discover AI tools and resources curated by GenAI Pro. Stay tuned for updates!"
        />
      </Helmet>
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">COMING SOON</h1>
        <p className="coming-soon-tagline">AI tools will be listed here</p>
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

export default Tools;
