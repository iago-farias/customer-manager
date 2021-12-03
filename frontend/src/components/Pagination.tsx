
type PaginationProps = {
  pageNumber: number;
  first: boolean;
  last: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export default function Pagination({pageNumber, first, last, handleNextPage, handlePreviousPage} : PaginationProps) {
  return (
    <div className="d-flex justify-content-center py-4">
      <nav>
        <ul className="pagination">
          <li 
            className={`page-item ${first ? 'disabled' : ''}`}
            onClick={handleNextPage}
          >
            <span className="page-link">Anterior</span>
          </li>
          <li className="page-item" aria-current="page">
            <span className="page-link">{pageNumber + 1}</span>
          </li>
          <li 
            className={`page-item ${last ? 'disabled' : ''}`}
            onClick={handleNextPage}
          >
            <span className="page-link">Próxima</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}