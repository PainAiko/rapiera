function LoadingPages() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div id="loading-spinner">
        <div className="spinner outer">
          <div className="spinner inner">
            <div className="spinner eye"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPages;
