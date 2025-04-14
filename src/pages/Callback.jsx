import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const returnedState = urlParams.get("state");
    const storedState = localStorage.getItem("oauth_state");
    const codeVerifier = localStorage.getItem("pkce_code_verifier");

    // Validar state para prevenir CSRF
    if (returnedState !== storedState) {
      alert("Error de seguridad: state no coincide.");
      return;
    }

    // Hacer POST para obtener el token
    const fetchToken = async () => {
      try {
        const data = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: "http://localhost:3000/callback",
          code_verifier: codeVerifier,
        });

        const response = await axios.post("https://cloud.romapy.com/oauth2/token", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic ZnJvbnR3ZWI6MTIzNDU2", // frontweb:123456 en base64
          },
        });

        const { access_token, refresh_token } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Redirigir a la app principal
        navigate("/movies");
      } catch (error) {
        console.error("Error al obtener el token:", error);
        alert("No se pudo obtener el token.");
      }
    };

    if (code && codeVerifier) {
      fetchToken();
    }
  }, [navigate]);

  return <p>Procesando autenticación...</p>;
};

export default Callback;
