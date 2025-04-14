import api from "./api";

export const fetchProducers = async () => {
    const response = await api.get("/producers");
    console.log("Producers data:", response.data); // Verifica los datos
    return response.data;
  };
  
  export const fetchStudios = async () => {
    const response = await api.get("/studios");
    console.log("Studios data:", response.data); // Verifica los datos
    return response.data;
  };