import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";
import NewArticle from "./NewArticle";
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

  const isNewVersion = article && "version" in article && article.version === 2;

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
              content={
                article.previewText ||
                article.metaDescription ||
                article.content?.slice(0, 150)
              }
            />
            <meta
              property="og:title"
              content={`${article.title} – GenAI Pro`}
            />
            <meta
              property="og:description"
              content={
                article.previewText ||
                article.metaDescription ||
                article.content?.slice(0, 150)
              }
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
              content={
                article.previewText ||
                article.metaDescription ||
                article.content?.slice(0, 150)
              }
            />
            <meta
              name="twitter:image"
              content="https://www.genai-pro.com/og-image.jpg"
            />
          </Helmet>

          <div className={` ${!isNewVersion ? "container full-article mt-4 text-center" : ""}   `}>
           { !isNewVersion && <h1>{article.title}</h1>}

            {/* ✅ Article Image Section */}
          { !isNewVersion &&  <div
              className={`col-auto full-img-cont image-container ${
                isDark ? "bg-light text-dark" : "bg-dark text-white"
              }`}
            >
              {article.image_url ? (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="img-fluid"
                />
              ) : (
                <p className="image-text">
                  {article.keywords?.split(" ").slice(0, 5).join(" ")}...
                </p>
              )}
            </div>}

            {/* ✅ AI-Optimized HTML Render */}
            {isNewVersion ? (
              <NewArticle content={article.content} Time={article.Time} />
            ) : (
              <div
                className="article-html text-start mt-4"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            )}
          </div>
        </>
      ) : (
        <ArticleList />
      )}
    </>
  );
}

export default FullArticle;
