import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function MainArticle({ articles }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (articles.length === 0) return null;
  return (
    <div
      className={`p-4 p-md-5 mb-4 mt-5 rounded border main-article container ${
        isDark ? "bg-dark dark border-secondary" : "bg-white"
      }`}
    >
      <div key={articles[currentIndex].title} className="fade-slide">
        <div className="row align-items-center main-container">
          <div className="col-lg-6">
            <h1 className="display-4 fst-italic">{articles[currentIndex].title.split(" ").slice(0,3).join(" ")}...</h1>
            <p className="lead my-3">{articles[currentIndex].previewText}</p>
            <p className="lead mb-0">
              <a href="#" className={`fw-bold  text-decoration-none ${isDark ? "text-info" : "text-body-emphasis"}`}>
                Continue reading...
              </a>
            </p>
          </div>

          <div className={`col-auto image-container main-keywords ${
              isDark ? "bg-light text-dark" : "bg-dark text-white"
            }`}
          >
            <p className="image-text">{articles[currentIndex].keywords}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        {articles.map((_, index) => (
          <span
            key={index}
            className={`mx-1 d-inline-block rounded-circle ${
              index === currentIndex ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: "10px", height: "10px", display: "inline-block" }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default MainArticle;
