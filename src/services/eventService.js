const API_URL = "http://localhost:3000";

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/events`);
  return await response.json();
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  return await response.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE"
  });
};

export const updateEvent = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  return await response.json();
};

// 🔹 Actualizar capacidad cuando un usuario reserva
export const updateEventCapacity = async (event) => {
  const response = await fetch(`${API_URL}/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });

  return await response.json();
};