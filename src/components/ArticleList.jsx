import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ArticleActions } from "../store/Article";
import Article from "./Article";
import MainArticle from "./MainArticle";
import Spinner from "./Spinner";
import WelcomeMessage from "./WelcomeMessage";
import { SearchContext } from "../App";

async function fetchArticles() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts: articlesData } = await response.json();
  return articlesData;
}

function ArticleList() {
  const {search} =  useContext(SearchContext)
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

      <MainArticle article={filteredArticles[0]} />
      <div className="row mb-2 article">
        
        {filteredArticles.map((article, index) => {
          if(index !== 0){
            return <Article key={index} article={article} />;
          }
        })}
      </div>
    </>
  );
}

export default ArticleList;
