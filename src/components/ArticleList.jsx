import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ArticleActions } from "../store/Article";
import Article from "./Article";
import MainArticle from "./MainArticle";
import Spinner from "./Spinner";
import WelcomeMessage from "./WelcomeMessage";
import { SearchContext } from "../App";

async function fetchArticles() {
  const response = await fetch("https://gen-ai-backend-nine.vercel.app/articles/");
  const { articles } = await response.json();
  // console.log(articles)
  return articles;
}

function ArticleList() {
  const { search } = useContext(SearchContext);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    const loadArticles = async () => {
      const articles = await fetchArticles();
      dispatch(ArticleActions.AddArticle(articles));
      setFetching(false);
    };
    loadArticles();
  }, [dispatch]);

  const articles = useSelector((store) => store.article);

  const filteredArticles = search
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
      )
    : articles;
  return (
    <>
      {fetching && <Spinner />}
      {!fetching && filteredArticles.length == 0 && <WelcomeMessage />}

      {search ? ( <div className="row m-4">
       { filteredArticles.map((article, index) => {
        return  <Article key={index} article={article} />
         })}
        </div>
      ) : (
        <>
          <MainArticle articles={filteredArticles.slice(0, 3)} />
          <div className="row mb-2 article-row">
            {filteredArticles.map((article, index) => {
              if (![0, 1, 2].includes(index)) {
                return <Article key={index} article={article} />;
              }
            })}
        </div>
        </>
      )}

    </>
  );
}

export default ArticleList;
