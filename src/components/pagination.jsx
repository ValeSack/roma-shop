import React from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import "../css/pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <FiArrowLeftCircle />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`pagination-number ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)} 
        >
          {i + 1}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1} 
      >
        <FiArrowRightCircle />
      </button>
    </div>
  );
};