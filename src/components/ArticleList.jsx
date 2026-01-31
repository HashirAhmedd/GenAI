import { useContext, useEffect, useState, useCallback, useRef } from "react";
import Article from "./Article";
import MainArticle from "./MainArticle";
import MainArticleSkeleton from "./MainArticleSkeleton";
import WelcomeMessage from "./WelcomeMessage";
import { SearchContext } from "../App";
import { Helmet } from "react-helmet-async";

const API_BASE_URL = "https://gen-ai-backend-nine.vercel.app/articles";

// Fetch articles with range parameter
async function fetchArticles(start, end) {
  const response = await fetch(`${API_BASE_URL}?range=${start}-${end}`);
  const data = await response.json();
  return {
    articles: data.articles || [],
    totalArticles: data.totalArticles || 0,
  };
}

function ArticleList() {
  const { search } = useContext(SearchContext);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(15);
  const [currentArticles, setCurrentArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [error, setError] = useState(null);

  // Cache for already fetched pages
  const articlesCache = useRef(new Map());
  const featuredLoaded = useRef(false);

  // Number of featured articles shown in MainArticle component
  const FEATURED_COUNT = 5;

  // Calculate total pages (excluding featured articles from pagination)
  const totalPages = Math.ceil(
    (totalArticles - FEATURED_COUNT) / articlesPerPage,
  );

  // Generate cache key for a page
  const getCacheKey = useCallback((page, perPage) => `${page}-${perPage}`, []);

  // Load featured articles (first 5) - only once
  const loadFeaturedArticles = useCallback(async () => {
    if (featuredLoaded.current) return;

    setFetching(true);
    try {
      const { articles, totalArticles: total } = await fetchArticles(
        1,
        FEATURED_COUNT,
      );
      setFeaturedArticles(articles);
      setTotalArticles(total);
      featuredLoaded.current = true;
    } catch (err) {
      console.error("Error loading featured articles:", err);
      setError("Failed to load featured articles");
    } finally {
      setFetching(false);
    }
  }, []);

  // Load articles for current page
  const loadPageArticles = useCallback(
    async (page, perPage) => {
      const cacheKey = getCacheKey(page, perPage);

      // Check cache first
      if (articlesCache.current.has(cacheKey)) {
        setCurrentArticles(articlesCache.current.get(cacheKey));
        return;
      }

      setFetching(true);
      setError(null);

      try {
        // Calculate range: skip featured articles (first 5) for page calculations
        // Page 1: articles 6-20 (if perPage=15), Page 2: articles 21-35, etc.
        const start = FEATURED_COUNT + 1 + (page - 1) * perPage;
        const end = start + perPage - 1;

        const { articles, totalArticles: total } = await fetchArticles(
          start,
          end,
        );

        // Update total if changed
        if (total && total !== totalArticles) {
          setTotalArticles(total);
        }

        // Cache the results
        articlesCache.current.set(cacheKey, articles);
        setCurrentArticles(articles);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setFetching(false);
      }
    },
    [getCacheKey, totalArticles],
  );

  // Initial load - featured articles
  useEffect(() => {
    loadFeaturedArticles();
  }, [loadFeaturedArticles]);

  // Load articles when page or articlesPerPage changes
  useEffect(() => {
    if (!search && featuredLoaded.current) {
      loadPageArticles(currentPage, articlesPerPage);
    }
  }, [currentPage, articlesPerPage, loadPageArticles, search]);

  // Clear cache when articlesPerPage changes
  useEffect(() => {
    articlesCache.current.clear();
  }, [articlesPerPage]);

  // Filter articles locally when searching (only searches currently loaded articles)
  const displayArticles = search
    ? [...featuredArticles, ...currentArticles].filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase()),
      )
    : currentArticles;

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
          {displayArticles && displayArticles.length > 0 ? (
            displayArticles.map((article, index) => (
              <Article key={article._id || index} article={article} />
            ))
          ) : (
            <WelcomeMessage />
          )}
        </div>
      ) : (
        <>
          {fetching && featuredArticles.length === 0 ? (
            <MainArticleSkeleton />
          ) : (
            featuredArticles.length > 0 && (
              <>
                <MainArticle articles={featuredArticles} />
                <div className="container">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() =>
                          loadPageArticles(currentPage, articlesPerPage)
                        }
                      >
                        Retry
                      </button>
                    </div>
                  )}
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
                          Page {currentPage} of {totalPages || 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="article-row">
                    {fetching ? (
                      <div className="text-center w-100 py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      currentArticles.map((article, index) => (
                        <Article key={article._id || index} article={article} />
                      ))
                    )}
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
