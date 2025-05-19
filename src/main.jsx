import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Store from "./store/index.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticleList from "./components/ArticleList.jsx";
import FullArticle from "./components/FullArticle.jsx";
import Tools from "./components/Tools.jsx";
import Tutorials from "./components/Tutorials.jsx";
import {HelmetProvider} from "react-helmet-async";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ArticleList />,
      },
      {
        path: "/articles/:id",
        element: <FullArticle />,
      },
      {
        path: "/tools",
        element: <Tools />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <HelmetProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
