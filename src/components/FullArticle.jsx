import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NewArticle from "./NewArticle";
import { Helmet } from "react-helmet-async";

const API_BASE_URL = "https://gen-ai-backend-nine.vercel.app/articles";

function FullArticle() {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";
  const params = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single article by ID
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${params.id}`);
        if (!response.ok) {
          throw new Error("Article not found");
        }
        const data = await response.json();
        setArticle(data.article || data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

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

  // Show loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading article...</p>
      </div>
    );
  }

  // Show error state
  if (error || !article) {
    return (
      <div className="container text-center mt-5">
        <h2>Article not found</h2>
        <p className="text-muted">
          {error || "The article you're looking for doesn't exist."}
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go back to Home
        </button>
      </div>
    );
  }

  return (
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
        <meta property="og:title" content={`${article.title} – GenAI Pro`} />
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
        <meta name="twitter:title" content={`${article.title} – GenAI Pro`} />
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

      <div
        className={` ${!isNewVersion ? "container full-article mt-4 text-center" : ""}   `}
      >
        {!isNewVersion && <h1>{article.title}</h1>}

        {/* ✅ Article Image Section */}
        {!isNewVersion && (
          <div
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
          </div>
        )}

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
  );
}

export default FullArticle;
