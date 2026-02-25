const API_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Credenciales incorrectas");
  }

  return data[0]; // devuelve usuario encontrado
};