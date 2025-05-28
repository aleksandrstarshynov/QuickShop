function Pagination({ currentPage, totalPages, onPageChange, buttonClassName }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`${buttonClassName} ${page === currentPage ? 'active' : ''}`}
          style={{ margin: '0 4px' }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
