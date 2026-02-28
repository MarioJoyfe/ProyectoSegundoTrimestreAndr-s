const API_URL = "http://localhost:3000";

export const createReservation = async (reservation) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservation)
  });

  return await response.json();
};

export const getUserReservations = async (userId) => {
  const response = await fetch(`${API_URL}/reservations?userId=${String(userId)}`);
  return await response.json();
};

export const deleteReservation = async (id) => {
  await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE"
  });
};