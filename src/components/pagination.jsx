export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
      if (page >= 0 && page < totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 0}>
          ← Anterior
        </button>
  
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              fontWeight: i === currentPage ? "bold" : "normal",
              margin: "0 4px",
            }}
          >
            {i + 1}
          </button>
        ))}
  
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Siguiente →
        </button>
      </div>
    );
  };
  