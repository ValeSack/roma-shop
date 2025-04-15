import { useState, useCallback, useEffect, useMemo } from "react";
import {
  fetchMoviesFromApi,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../api/moviesService";
import { fetchProducers, fetchStudios } from "../api/producersAndStudios";
import { Pagination } from "../components/pagination";
import { CustomTable } from "../components/CustomTable";
import { CustomFilter } from "../components/CustomFilter";
import { MovieForm } from "../components/MovieForm";
import { CustomModal } from "../components/CustomModal";
import "../css/Movies.css";

import { IoMdCreate } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 1 });
  const [producers, setProducers] = useState([]);
  const [studios, setStudios] = useState([]);
  const [filters, setFilters] = useState({ producerId: "", studioId: "" });
  const [currentMovie, setCurrentMovie] = useState({ name: "", producerId: "", studioId: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [producersData, studiosData] = await Promise.all([fetchProducers(), fetchStudios()]);
        setProducers(producersData);
        setStudios(studiosData);
      } catch (error) {
        console.error("Error al cargar productores o estudios:", error);
      }
    };
    loadData();
    fetchMovies(0);
  }, []);

  const fetchMovies = useCallback(async (page = 0) => {
    try {
      const data = await fetchMoviesFromApi(page, filters);
      setMovies(data.content);
      setPageInfo(data.page);
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  }, [filters]);

  const saveMovie = useCallback(async () => {
    try {
      if (currentMovie.id) {
        await updateMovie(currentMovie);
      } else {
        await createMovie(currentMovie);
      }
      fetchMovies(0);
      closeModal();
    } catch (error) {
      console.error("Error al guardar película:", error);
    }
  }, [currentMovie, fetchMovies]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies(0);
    } catch (error) {
      console.error("Error al eliminar película:", error);
    }
  }, [fetchMovies]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentMovie((prev) => ({
      ...prev,
      [name]: name === "producerId" || name === "studioId" ? Number(value) || "" : value,
    }));
  }, []);

  const openModal = useCallback((movie = { name: "", producerId: "", studioId: "" }) => {
    setCurrentMovie({
      id: movie.id || "",
      name: movie.name || "",
      producerId: movie.producers?.[0]?.id || "",
      studioId: movie.studios?.[0]?.id || "",
    });
    setShowForm(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowForm(false);
    setCurrentMovie({ name: "", producerId: "", studioId: "" });
  }, []);

  const handleClick = (page) => {
    fetchMovies(page);
  };

  const columns = useMemo(() => [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
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
  ], []);

  const actions = useMemo(() => [
    {
      label: <IoMdCreate />,
      onClick: (movie) => openModal(movie),
    },
    {
      label: <FiTrash2 />,
      onClick: (movie) => handleDelete(movie.id),
    },
  ], [openModal, handleDelete]);

  return (
    <div className="movies-container">
      <div className="header">
        <h1>Películas</h1>
        <CustomFilter
          values={filters}
          producers={producers}
          studios={studios}
          onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
          onSubmit={(e) => {
            e.preventDefault();
            fetchMovies(0);
          }}
          onClear={() => setFilters({ producerId: "", studioId: "" })}
          submitText="Filtrar"
        />
      </div>
      <CustomModal
        isOpen={showForm}
        onClose={closeModal}
        title={currentMovie.id ? "Editar película" : "Crear película"}
      >
        <MovieForm
          onChange={handleChange}
          onSubmit={(e) => {
            e.preventDefault();
            saveMovie();
          }}
          formData={currentMovie}
          producers={producers}
          studios={studios}
          title={currentMovie.id ? "Actualizar" : "Crear"}
        />
      </CustomModal>
      <CustomTable columns={columns} data={movies} actions={actions} />
      <Pagination
        currentPage={pageInfo.number}
        totalPages={pageInfo.totalPages}
        onPageChange={handleClick}
      />
      <button className="floating-button" onClick={() => openModal()}>
        +
        <span className="tooltip-text">Crear nueva película</span>
      </button>
    </div>
  );
};

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