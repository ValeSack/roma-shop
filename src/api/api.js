import axios from "axios";
import { initiateAuthFlow } from "../auth/initiateAuthFlow";
import { refreshAccessToken } from "../auth/tokenService"; 

// Instancia de Axios
const api = axios.create({
  baseURL: "https://cloud.romapy.com/v1",
});

// Intercepta cada request para agregar el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepta respuestas para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);

        // Redirigir al flujo de autenticación si el refresh token falla
        await initiateAuthFlow();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;