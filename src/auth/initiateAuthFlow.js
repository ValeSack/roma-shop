import { createPKCE } from "./pkceService";

export async function initiateAuthFlow() {
  const { codeChallenge } = await createPKCE();

  const state = Math.random().toString(36).substring(2);
  localStorage.setItem("oauth_state", state);

  const redirectUri = encodeURIComponent("http://localhost:3000/callback");
  const clientId = "frontweb";
  const scope = encodeURIComponent("read write");

  window.location.href = `https://cloud.romapy.com/oauth2/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
}