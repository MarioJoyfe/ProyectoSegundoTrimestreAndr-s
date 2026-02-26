const API_URL = "http://localhost:3000";

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/events`);
  const data = await response.json();
  return data;
};

export const createEvent = async (eventData) => {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  return await response.json();
};

export const deleteEvent = async (id) => {
  await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE"
  });
};

export const updateEvent = async (id, updatedData) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  return await response.json();
};