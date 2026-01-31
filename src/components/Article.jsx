import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Article({ article }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  if (!article || typeof article !== "object") return null;

  return (
    <div className="article">
      <div
        className={`row g-0 rounded overflow-hidden position-relative ${
          isDark ? "dark-bg" : "light-bg rounded"
        }`}
      >
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className={`mb-0 ${isDark ? "" : "title-light"} `}>
            {article.title.split(" ").slice(0, 4).join(" ")}...
          </h3>
          <div className="mb-1">{article.Time.slice(0, 10)}</div>
          <p className="card-text prevText">
            {article.previewText.split(" ").slice(0, 18).join(" ")}...
          </p>
          <NavLink to={`/articles/${article._id}`}>
            <button className="btn btn-primary">Continue Reading</button>
          </NavLink>
        </div>

        <div
          className={`col-auto image-container ${
            isDark ? "bg-light text-dark" : "bg-dark text-white"
          }`}
        >
          {article.image_url ? (
            <img
              src={article.image_url}
              alt="graphics card image"
              className="image-text"
            />
          ) : (
            <p className="image-text">
              {article.keywords.split(" ").slice(0, 5).join(" ")}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
