import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">
        Eventos Disponibles
      </h1>

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <EventCard
              event={event}
              refreshEvents={loadEvents}
            />
          </div>
        ))}
      </div>
    </div>
  );
}