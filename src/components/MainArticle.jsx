
import { useSelector } from "react-redux";

function MainArticle({ article }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  if (!article) return null;

  return (
    <div
      className={`p-4 p-md-5 mb-4 mt-5 rounded border main-article container ${
        isDark ? "bg-dark dark border-secondary" : "bg-white"
      }`}
    >
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 fst-italic">{article.title}</h1>
          <p className="lead my-3">{article.body}</p>
          <p className="lead mb-0">
            <a
              href="#"
              className={`fw-bold ${isDark ? "text-info" : "text-body-emphasis"}`}
            >
              Continue reading...
            </a>
          </p>
        </div>

        <div className="col-lg-6 text-center">
          <img
            src={'./facebook.svg'} 
            alt="Article"
            className="img-fluid rounded"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainArticle;
