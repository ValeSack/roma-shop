import { useState, useCallback, useEffect } from "react";
import api from "../api/api";
import MovieForm from "../components/MovieForm";
import { Pagination } from "../components/pagination";
import MoviesSearchBar from "../components/MoviesSearchBar";
import { CustomTable } from "../components/CustomTable";
import { IoMdCreate } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

const renderList = (items, keyField = "id", valueField = "name") => {
  if (Array.isArray(items) && items.length > 0) {
    return (
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((item) => (
          <li key={item[keyField]}>{item[valueField]}</li>
        ))}
      </ul>
    );
  }
  return <span>-</span>;
};

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  {
    key: "createdAt",
    label: "Fecha de creación",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "producers",
    label: "Productores",
    render: (value) => renderList(value),
  },
  {
    key: "studios",
    label: "Estudios",
    render: (value) => renderList(value),
  },
];

export const Movies = () => {
  const [filters, setFilters] = useState({});
  const [movies, setMovies] = useState([]);
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 1 });
  const [editingMovie, setEditingMovie] = useState(null);
console.log(movies);

  const fetchMovies = useCallback(
    async (page = 0) => {
      try {
        const params = { page, ...filters };
        const response = await api.get("/movies", { params });
        setMovies(response.data.content);
        setPageInfo(response.data.page);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchMovies(0);
  }, [fetchMovies]);

  const handleSearch = (field, value) => {
    setFilters(value ? { [field]: value } : {});
    fetchMovies(0);
  };

  const handleCreate = async (movie) => {
    const payload = {
      name: movie.name,
      producers: [{ id: movie.producerId }], 
      studios: [{ id: movie.studioId }],
    };
    await api.post("/movies", payload);
    fetchMovies(0);
  };
  
  const handleEdit = async (movie) => {
    const payload = {
      name: movie.name,
      producers: [{ id: movie.producerId }], 
      studios: [{ id: movie.studioId }], 
    };
    await api.put(`/movies/${movie.id}`, payload);
    fetchMovies(0);
    setEditingMovie(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/movies/${id}`);
    fetchMovies(0);
  };

  const actions = [
    {
      label: <IoMdCreate />,
      onClick: (movie) => setEditingMovie(movie),
    },
    {
      label: <FiTrash2 />,
      onClick: (movie) => handleDelete(movie.id),
    },
  ];

  return (
    <div>
      <h1>Películas</h1>
      <MoviesSearchBar onSearch={handleSearch} />
      {editingMovie ? (
        <MovieForm movie={editingMovie} onSubmit={handleEdit} />
      ) : (
        <MovieForm onSubmit={handleCreate} />
      )}
      <CustomTable columns={columns} data={movies} actions={actions} />
      <Pagination
        currentPage={pageInfo.number}
        totalPages={pageInfo.totalPages}
        onPageChange={(page) => fetchMovies(page)}
      />
    </div>
  );
};