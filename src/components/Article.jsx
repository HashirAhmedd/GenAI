import { useSelector } from "react-redux";

function Article({ article }) {
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  if (!article) return null;
  const pictreLinks = [
    "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QUl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEFJfGVufDB8fDB8fHww",
    "https://media.istockphoto.com/id/1976099664/photo/artificial-intelligence-processor-concept-ai-big-data-array.webp?a=1&b=1&s=612x612&w=0&k=20&c=H785hZU33rYNjGsiRuN5q2UleUxp4H7W2IMgkq8gXUQ=",
  ];

  return (
    <div className="col-md-6">
      <div
        className={`row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative ${
          isDark ? "bg-dark dark border-secondary" : "bg-white"
        }`}
      >
        <div className="col p-4 d-flex flex-column position-static">
          <strong
            className={`d-inline-block mb-2 ${
              isDark ? "text-info" : "text-primary-emphasis"
            }`}
          >
            AI
          </strong>
          <h3 className="mb-0">
            {article.title.split(" ").slice(0, 5).join(" ")}
          </h3>
          <div className="mb-1">Feb 1</div>
          <p className="card-text mb-auto">
            {article.body.split(" ").slice(0, 10).join(" ")}
          </p>
          <a
            href="#"
            className={`icon-link gap-1 icon-link-hover stretched-link ${
              isDark ? "text-info" : ""
            }`}
          >
            Continue reading
          </a>
        </div>
        <div className="col-auto image-container">
          <img
            src={`${pictreLinks[Math.round(Math.random() * 3)]}`}
            alt="Thumbnail"
            className="fixed-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Article;
