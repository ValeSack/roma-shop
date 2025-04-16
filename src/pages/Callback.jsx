import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";

const Callback = () => {
  const navigate = useNavigate();
  const { login, oauthState, pkce, canNegotiate } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const returnedState = urlParams.get("state");

    // POST para obtener el token
    const fetchToken = async () => {
      try {
        const data = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: "http://localhost:3000/callback",
          code_verifier: pkce,
        });

        const response = await axios.post("https://cloud.romapy.com/oauth2/token", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic ZnJvbnR3ZWI6MTIzNDU2",
          },
        });

        const { access_token, refresh_token } = response.data;
        login(access_token, refresh_token, pkce, returnedState);
        navigate("/movies");
      } catch (error) {
        console.error("Error fetching token:", error);
        alert("Failed to authenticate.");
      }
    };

    if (code && pkce) {
      fetchToken();
    }
  }, [login, navigate]);

  return <p>Procesando autenticación...</p>;
};

export default Callback;