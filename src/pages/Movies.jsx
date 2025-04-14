import { useState, useCallback, useEffect } from "react";
import "../css/Movies.css";
import { fetchProducers, fetchStudios } from "../api/producersAndStudios";
import api from "../api/api";
import { Pagination } from "../components/pagination";
import { CustomTable } from "../components/CustomTable";
import { CustomFilter } from "../components/CustomFilter";
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
  const [filters, setFilters] = useState({
    producerId: "",
    studioId: "",
  });
  
  const [appliedFilters, setAppliedFilters] = useState({});
  const [movies, setMovies] = useState([]);
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 1 });
  const [producers, setProducers] = useState([]);
  const [studios, setStudios] = useState([]);
  // console.log(movies);
  // console.log(producers, studios);


  const fetchMovies = useCallback(
    async (page = 0) => {
      try {
        const params = { page, ...appliedFilters };
        const response = await api.get("/movies", { params });
        setMovies(response.data.content);
        setPageInfo(response.data.page);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    },
    [appliedFilters]
  );
  

  useEffect(() => {
    fetchMovies(0);
  }, [fetchMovies]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [producersData, studiosData] = await Promise.all([
          fetchProducers(),
          fetchStudios(),
        ]);
        setProducers(producersData);
        setStudios(studiosData);
      } catch (error) {
        console.error("Error al cargar productores o estudios:", error);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "producerId" || name === "studioId" ? Number(value) || "" : value,
    }));
  };


  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, val]) => {
      if (val !== "") acc[key] = val;
      return acc;
    }, {});
    setAppliedFilters(cleanedFilters);
  };
  
  const handleClearFilters = () => {
    setFilters({
      producerId: "",
      studioId: "",
    });
    setAppliedFilters({});
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
    <div className="movies-container">
      <div className="header">
        <h1>Películas</h1>
          <CustomFilter
            values={filters}
            producers={producers}
            studios={studios}
            onChange={handleInputChange}
            onSubmit={handleFilterSubmit}
            onClear={handleClearFilters}
            submitText="Filtrar"
          />
      </div>
      <CustomTable columns={columns} data={movies} actions={actions} />
      <Pagination
        currentPage={pageInfo.number}
        totalPages={pageInfo.totalPages}
        onPageChange={(page) => fetchMovies(page)}
      />
    </div>
  );
};