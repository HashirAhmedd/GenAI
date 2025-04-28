import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MainArticle({ articles }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  if (articles.length === 0 || !articles) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <div
      className={`p-4 p-md-5 mb-4 mt-5 rounded main-article container ${
        isDark ? "dark-bg" : "light-bg rounded"
      }`}
    >
      <div className="row main-container">
        {/* Left Main Article */}
        <div className="col-md-6 main-featured-article">
          <div className="h-100 p-4 d-flex flex-column">
            <h1
              className={`display-4 fst-italic mb-4 ${
                isDark ? "" : "title-light"
              }`}
            >
              {mainArticle.title}
            </h1>

            <div
              className={`image-container main-keywords align-self-start mb-4 ${
                isDark ? "bg-light text-dark" : "bg-dark text-white"
              }`}
            >
              <p className="image-text">
                {mainArticle.keywords.split(" ").slice(0, 5).join(" ")}...
              </p>
            </div>

            <p className="lead mb-4">{mainArticle.previewText}</p>

            <div className="mt-auto">
              <NavLink to={`/Articles/${mainArticle._id}`}>
                <button className="btn btn-primary">Continue Reading</button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="col-md-6">
          <div className="row g-3">
            {sideArticles.map((article, index) => (
              <div key={article._id} className="col-md-6">
                <div
                  className={`h-100 p-3 ${
                    isDark ? "dark-bg" : "light-bg"
                  } rounded`}
                >
                  <h4 className={isDark ? "" : "title-light"}>
                    {article.title.split(" ").slice(0, 6).join(" ")}...
                  </h4>
                  <p className="mb-2">
                    {article.previewText.split(" ").slice(0, 12).join(" ")}...
                  </p>
                  <NavLink to={`/Articles/${article._id}`}>
                    <button className="btn btn-primary btn-sm">
                      Continue Reading
                    </button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainArticle;
