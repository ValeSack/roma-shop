import api from "../api/api";

export const fetchMoviesFromApi = async (page, filters) => {
  const params = { page, ...filters };
  const response = await api.get("/movies", { params });
  return response.data;
};

export const createMovie = async (movie) => {
  const payload = {
    name: movie.name,
    producers: [{ id: movie.producerId }],
    studios: [{ id: movie.studioId }],
  };
  const response = await api.post("/movies", payload);
  return response.data;
};

export const updateMovie = async (movie) => {
    const payload = {
      name: movie.name,
      producers: [{ id: movie.producerId }],
      studios: [{ id: movie.studioId }],   
    };
    const response = await api.put(`/movies/${movie.id}`, payload);
    return response.data;
  };
  
export const deleteMovie = async (id) => {
  await api.delete(`/movies/${id}`);
};