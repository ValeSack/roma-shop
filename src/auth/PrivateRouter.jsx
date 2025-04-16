import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPKCE } from "./pkceService";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const { isAuthenticated, setPKCE, setOauthState } = useAuth();

  useEffect(() => {
    const redirectToLogin = async () => {
      const state = crypto.randomUUID();
      const { verifier, challenge } = await createPKCE();

      setPKCE(verifier);
      setOauthState(state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: "frontweb",
        redirect_uri: "http://localhost:3000/callback",
        state,
        scope: "READ WRITE",
        code_challenge: challenge,
        code_challenge_method: "S256",
      });

      window.location.href = `https://cloud.romapy.com/oauth2/authorize?${params.toString()}`;
    };

    if (!isAuthenticated) {
      redirectToLogin();
    } else {
      setChecking(false);
    }
  }, [isAuthenticated, location]);

  if (checking) {
    return <p>Verificando autenticación...</p>;
  }

  return children;
};

export default PrivateRoute;