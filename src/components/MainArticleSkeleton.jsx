function MainArticleSkeleton() {
    return (
      <div className="p-4 p-md-5 mb-4 mt-5 rounded main-article container light-bg">
        <div className="row main-container">
          {/* Left Main Article Skeleton */}
          <div className="col-md-6 main-featured-article">
            <div className="h-100 p-4 d-flex flex-column">
              <div className="skeleton-title mb-4"></div>
              <div className="skeleton-keywords mb-4"></div>
              <div className="skeleton-text mb-4">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
              <div className="mt-auto">
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
  
          {/* Right Side Grid Skeleton */}
          <div className="col-md-6">
            <div className="row g-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-md-6">
                  <div className="h-100 p-3 light-bg rounded">
                    <div className="skeleton-title-sm mb-3"></div>
                    <div className="skeleton-text">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line"></div>
                    </div>
                    <div className="skeleton-button-sm mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MainArticleSkeleton;
  