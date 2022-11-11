export function Paginate({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageIcon = (pageNumber: number) => {
    const isActive = pageNumber === currentPage;

    return (
      <button key={`btn-page-${pageNumber}`}
        className={`btn btn-sm btn-accent disabled:btn-active`}
        disabled={isActive}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderIconRow = () => {
    const icons: any[] = [];

    icons.push(renderPageIcon(1));

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
        icons.push(renderPageIcon(i));
      }
    }

    if (currentPage < totalPages - 1) {
      icons.push(renderPageIcon(totalPages));
    }

    return icons;
  };

  return (
    <nav aria-label="Page navigation" className="mt-6">
      <p className="hidden">
        (debug) CurrentPage: {currentPage} totalPages: {totalPages}
      </p>
      <div className="btn-group">
          <button
            className={`btn btn-sm btn-accent disabled:bg-gray-100`}
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        {renderIconRow()}
          <button
            className={`btn btn-sm btn-accent disabled:bg-gray-100`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
      </div>
    </nav>
  );
}
