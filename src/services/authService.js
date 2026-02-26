const API_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();

  const foundUser = users.find(
    (user) =>
      user.email.trim() === email.trim() &&
      user.password.trim() === password.trim()
  );

  if (!foundUser) {
    throw new Error("Credenciales incorrectas");
  }

  return foundUser;
};