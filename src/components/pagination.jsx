import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button
        style={{
          cursor: "pointer",
          fontSize: "25px",
        }}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <FiArrowLeftCircle />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          style={{
            fontWeight: i === currentPage ? "bold" : "normal",
            margin: "0 4px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          {i + 1}
        </button>
      ))}

      <button
        style={{
          cursor: "pointer",
          fontSize: "25px",
        }}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <FiArrowRightCircle />
      </button>
    </div >
  );
};
