export const login = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/v1/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Error al iniciar sesión");
  return await response.json();
};
