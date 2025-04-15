import axios from "axios";

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No hay refresh token disponible.");
  }

  const data = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post("https://cloud.romapy.com/oauth2/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic ZnJvbnR3ZWI6MTIzNDU2",
    },
  });

  const { access_token, refresh_token: newRefreshToken } = response.data;
  
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", newRefreshToken);

  return access_token;
}