// components/Pagination.jsx
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
  
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            style={{ margin: '0 4px' }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
  
  export default Pagination;
  