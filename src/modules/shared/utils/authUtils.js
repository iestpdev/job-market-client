export const isAuthenticated = () => {
  const stored = localStorage.getItem("auth");
  if (!stored) return false;
  try {
    const parsed = JSON.parse(stored);
    return parsed?.isAuthenticated && !!parsed?.token && !isTokenExpired(parsed.token);;
  } catch {
    return false;
  }
};

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < now;
  } catch (e) {
    return true;
  }
};