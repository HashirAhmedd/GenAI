import { useSelector } from "react-redux";

function Article({ article }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  if (!article) return null;

  return (
    <div className="col-md-6 ">
      <div
        className={` article row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative  ${
          isDark ? "bg-dark dark border-secondary" : "bg-white"
        }`}
      >
        <div className="col p-4 d-flex flex-column position-static">
          <strong
            className={`d-inline-block mb-2 ${
              isDark ? "text-info" : "text-primary-emphasis"
            }`}
          >
            AI
          </strong>
          <h3 className="mb-0">
            {article.title}
          </h3>
          <div className="mb-1">{article.Time.slice(0,10)}</div>
          <p className="card-text mb-auto">
            {article.previewText}
          </p>
          <a
            href="#"
            className={`icon-link gap-1 icon-link-hover stretched-link ${
              isDark ? "text-info" : ""
            }`}
          >
            Continue reading
          </a>
        </div>

        <div className={`col-auto image-container ${isDark ? "bg-light text-dark" : "bg-dark text-white"}`}>
          <p className={`image-text`}>
            {article.keywords}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Article;
