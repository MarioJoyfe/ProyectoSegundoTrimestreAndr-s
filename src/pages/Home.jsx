import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Eventos Disponibles</h1>

      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}