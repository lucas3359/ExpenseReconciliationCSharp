export function Paginate({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageIcon = (pageNumber: number) => {
    const isActive = pageNumber === currentPage;

    return (
      <li>
        <button
          className="block py-2 px-3 ml-0 leading-tight disabled:bg-gray-100"
          disabled={isActive}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      </li>
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
    <nav aria-label="Page navigation">
      <p>
        (debug) CurrentPage: {currentPage} totalPages: {totalPages}
      </p>
      <ul className="inline-flex items-center -space-x-px mt-5">
        <li>
          <button
            className="block py-2 px-3 ml-0 leading-tight disabled:bg-gray-100"
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {renderIconRow()}
        <li>
          <button
            className="block py-2 px-3 ml-0 leading-tight disabled:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
