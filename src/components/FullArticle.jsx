import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";
import { Helmet } from "react-helmet-async";

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
    const homeElement = document.querySelector(".home");
    if (homeElement) {
      homeElement.classList.add("white-bg");
    }
    return () => {
      if (homeElement) {
        homeElement.classList.remove("white-bg");
      }
    };
  }, []);

  return (
    <>
      {article ? (
        <>
          <Helmet>
            <title>{article.title} – GenAI Pro</title>
            <meta
              name="description"
              content={article.previewText || article.content?.slice(0, 150)}
            />
            <meta
              property="og:title"
              content={`${article.title} – GenAI Pro`}
            />
            <meta
              property="og:description"
              content={article.previewText || article.content?.slice(0, 150)}
            />
            <meta
              property="og:url"
              content={`https://www.genai-pro.com/articles/${article._id}`}
            />
            <meta property="og:type" content="article" />
            <meta
              property="og:image"
              content="https://www.genai-pro.com/og-image.jpg"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content={`${article.title} – GenAI Pro`}
            />
            <meta
              name="twitter:description"
              content={article.previewText || article.content?.slice(0, 150)}
            />
            <meta
              name="twitter:image"
              content="https://www.genai-pro.com/og-image.jpg"
            />
          </Helmet>
          <div className="container full-article text-center mt-4">
            <h1>{article.title}</h1>
            <p className="content">
              {article.content
                .split(" ")
                .slice(0, 120)
                .join(" ")
                .split("\n")
                .map((part, index) =>
                  index === 0 ? (
                    part
                  ) : (
                    <>
                      <br />
                      {part}
                    </>
                  )
                )}
            </p>

            <div
              className={`col-auto full-img-cont image-container ${
                isDark ? "bg-light text-dark" : "bg-dark text-white"
              }`}
            >
           
              {article.image_url ? (
                <img
                  src="https://res.cloudinary.com/dkyqmkqzd/image/upload/v1751717675/mdgbsqthzg7xbyizokjp.jpg"
                  alt="article cover image"
                  className=""
                />
              ) : (
                <p className="image-text">
                  {article.keywords.split(" ").slice(0, 5).join(" ")}...
                </p>
              )}
            </div>

            <p className="content">
              {article.content.split(" ").slice(120).join(" ")}
            </p>
          </div>
        </>
      ) : (
        <ArticleList />
      )}
    </>
  );
}

export default FullArticle;
