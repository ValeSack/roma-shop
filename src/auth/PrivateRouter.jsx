import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPKCE } from "./pkceService"; 

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
  
    const redirectToLogin = async () => {
      const state = crypto.randomUUID();
      const { codeVerifier, codeChallenge } = await createPKCE();
  
      localStorage.setItem("pkce_code_verifier", codeVerifier);
      localStorage.setItem("oauth_state", state);
  
      const params = new URLSearchParams({
        response_type: "code",
        client_id: "frontweb",
        redirect_uri: "http://localhost:3000/callback",
        state,
        scope: "READ WRITE",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      });
  
      window.location.href = `https://cloud.romapy.com/oauth2/authorize?${params.toString()}`;
    };
  
    if (!token) {
      redirectToLogin();
    } else {
      setChecking(false); 
    }
  }, [location]);

  if (checking) {
    return <p>Verificando autenticación...</p>;
  }

  return children;
};

export default PrivateRoute;