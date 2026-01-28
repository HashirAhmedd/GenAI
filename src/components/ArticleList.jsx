import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ArticleActions } from "../store/Article";
import Article from "./Article";
import MainArticle from "./MainArticle";
import MainArticleSkeleton from "./MainArticleSkeleton";
import WelcomeMessage from "./WelcomeMessage";
import { SearchContext } from "../App";
import { Helmet } from "react-helmet-async";

async function fetchArticles() {
  const response = await fetch(
    "https://gen-ai-backend-nine.vercel.app/articles/"
  );
  const { articles } = await response.json();
  return articles || [];
}

function ArticleList() {
  const { search } = useContext(SearchContext);
  const [fetching, setFetching] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(15);
  const maxRetries = 3;
  const dispatch = useDispatch();

  const articles = useSelector((store) => store.article);

  useEffect(() => {
    if (articles.length == 0) {
      setFetching(true);
      const loadArticles = async () => {
        const articles = await fetchArticles();
        articles.sort((a, b) => new Date(b.Time) - new Date(a.Time));
        if (articles.length > 0) {
          dispatch(ArticleActions.AddArticle(articles));
        } else if (retryCount < maxRetries) {
          setRetryCount(retryCount + 1);
        }
        setFetching(false);
      };
      loadArticles();
      if (articles.length === 0 && retryCount <= maxRetries) {
        loadArticles();
      }
    }
  }, [articles.length]);

  const filteredArticles = search
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
      )
    : articles;

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Handle articles per page change
  const handleArticlesPerPageChange = (e) => {
    setArticlesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing articles per page
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
        <Helmet>
        <title>GenAI Pro – AI, ML & Tech Insights</title>
        <meta
          name="description"
          content="Explore the latest insights in Artificial Intelligence, Machine Learning, and Technology. Stay updated with expert analysis and in-depth articles on AI trends and innovations."
        />
        <meta
          property="og:title"
          content="GenAI Pro – AI, ML & Tech Insights"
        />
        <meta
          property="og:description"
          content="Explore the latest insights in Artificial Intelligence, Machine Learning, and Technology."
        />
        <meta property="og:url" content="https://www.genai-pro.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.genai-pro.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="GenAI Pro – AI, ML & Tech Insights"
        />
        <meta
          name="twitter:description"
          content="Explore the latest insights in Artificial Intelligence, Machine Learning, and Technology."
        />
        <meta
          name="twitter:image"
          content="https://www.genai-pro.com/og-image.jpg"
        />
      </Helmet>
      {search ? (
        <div className="article-row m-4">
          {filteredArticles && filteredArticles?.length > 0 ? (
            filteredArticles.map((article, index) => {
              return <Article key={index} article={article} />;
            })
          ) : (
            <WelcomeMessage />
          )}
        </div>
      ) : (
        <>
          {fetching ? (
            <MainArticleSkeleton />
          ) : (
            filteredArticles &&
            filteredArticles?.length > 0 && (
              <>
                <MainArticle articles={filteredArticles.slice(0, 5)} />
                <div className="container">
                  <div className="row mb-4">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <div className="d-flex align-items-center">
                        <label htmlFor="articlesPerPage" className="me-2">
                          Articles per page:
                        </label>
                        <select
                          id="articlesPerPage"
                          className="form-select"
                          value={articlesPerPage}
                          onChange={handleArticlesPerPageChange}
                          style={{ width: "auto" }}
                        >
                          <option value={15}>15</option>
                          <option value={30}>30</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="d-flex justify-content-md-end align-items-center">
                        <span className="me-2">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="article-row">
                    {currentArticles.map((article, index) => {
                      if (![0, 1, 2, 3, 4].includes(index)) {
                        return <Article key={index} article={article} />;
                      }
                    })}
                  </div>
                  {totalPages > 1 && (
                    <nav aria-label="Page navigation" className="mt-4">
                      <ul className="pagination justify-content-center flex-wrap">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <span className="d-none d-sm-inline">Previous</span>
                            <span className="d-inline d-sm-none">←</span>
                          </button>
                        </li>
                        {currentPage > 2 && (
                          <>
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(1)}
                              >
                                1
                              </button>
                            </li>
                            {currentPage > 3 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                          </>
                        )}
                        {getPageNumbers().map((pageNum) => (
                          <li
                            key={pageNum}
                            className={`page-item ${
                              currentPage === pageNum ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        ))}
                        {currentPage < totalPages - 1 && (
                          <>
                            {currentPage < totalPages - 2 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </button>
                            </li>
                          </>
                        )}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <span className="d-none d-sm-inline">Next</span>
                            <span className="d-inline d-sm-none">→</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </>
            )
          )}
        </>
      )}
    </>
  );
}

export default ArticleList;
