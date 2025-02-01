import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArticleActions } from "../store/Article";
import Article from "./Article";
import MainArticle from "./MainArticle";
import Spinner from "./Spinner";
import WelcomeMessage from "./WelcomeMessage";

async function fetchArticles() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts: articlesData } = await response.json();
  return articlesData;
}

function ArticleList() {
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

  return (
    <>
      {fetching && <Spinner />}
      {!fetching && articles.length == 0 && <WelcomeMessage />}

      <MainArticle article={articles[0]} />
      <div className="row mb-2 article">
        
        {articles.map((article, index) => {
          if(index !== 0){
            return <Article key={index} article={article} />;
          }
        })}
      </div>
    </>
  );
}

export default ArticleList;
