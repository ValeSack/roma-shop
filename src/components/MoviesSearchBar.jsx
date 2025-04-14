import { useState } from "react";

const MoviesSearchBar = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("name"); 
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscando:", { searchType, searchValue });
    onSearch(searchType, searchValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="name">Película</option>
        <option value="producers">Productor</option>
        <option value="studios">Estudio</option>
      </select>

      <input
        type={searchType === "createdAt" ? "date" : "text"}
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
};

export default MoviesSearchBar;
