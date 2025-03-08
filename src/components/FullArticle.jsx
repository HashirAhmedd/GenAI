import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";

function FullArticle() {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";
  const params = useParams();
  const articles = useSelector((store) => store.article);
  let article;
  for (let one of articles) {
    if (params.id == one._id) {
      article = { ...one };
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const homeElement = document.querySelector('.home');
    if (homeElement) {
      homeElement.classList.add('white-bg');
    }
    return () => {
      if (homeElement) {
        homeElement.classList.remove('white-bg');
      }
    };
  }, []);

  return (
    <>
   {article? <div className="container full-article text-center mt-4">
      <h1>{article.title}</h1>
      <p className="content">
        {article.content.split(" ").slice(0, 120).join(" ")}
      </p>
      <div
        className={`col-auto full-img-cont image-container ${
          isDark ? "bg-light text-dark" : "bg-dark text-white"
        }`}
      >
        <p className="image-text">{article.keywords}</p>
      </div>
      <p className="content">
        {article.content.split(" ").slice(120).join(" ")}
      </p>
    </div> : <ArticleList />}
    </>
  );
}

export default FullArticle;
