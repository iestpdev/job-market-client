export const isAuthenticated = () => {
  const stored = localStorage.getItem("auth");
  if (!stored) return false;
  try {
    const parsed = JSON.parse(stored);
    return parsed?.isAuthenticated && !!parsed?.token;
  } catch {
    return false;
  }
};
