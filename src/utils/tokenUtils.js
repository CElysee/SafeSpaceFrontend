import { useNavigate } from "react-router-dom";

// Function to check if a JWT token has expired
export function isTokenExpired(token) {
  const navigate = useNavigate();
  if (token === null) {
    return null;
  } else {
    const parts = token.split(".");
    if (parts.length !== 3) {
      // Invalid token format
      return true;
    }
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) {
      // Token does not have an 'exp' claim
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime;
  }
}
