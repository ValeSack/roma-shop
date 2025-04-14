import api from "./api";

export const fetchProducers = async () => {
  const response = await api.get("/producers");
  return response.data.content;
};

export const fetchStudios = async () => {
  const response = await api.get("/studios");
  return response.data.content;
};
