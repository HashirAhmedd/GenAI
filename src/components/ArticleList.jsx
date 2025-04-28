import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ArticleActions } from "../store/Article";
import Article from "./Article";
import MainArticle from "./MainArticle";
import MainArticleSkeleton from "./MainArticleSkeleton";
import WelcomeMessage from "./WelcomeMessage";
import { SearchContext } from "../App";

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

  return (
    <>
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
                <div className="container article-row">
                  {filteredArticles.map((article, index) => {
                    if (![0, 1, 2, 3, 4].includes(index)) {
                      return <Article key={index} article={article} />;
                    }
                  })}
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
