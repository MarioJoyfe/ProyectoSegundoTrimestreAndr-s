import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createReservation } from "../services/reservationService";
import { updateEventCapacity } from "../services/eventService";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

export default function EventCard({ event, refreshEvents = () => {} }) {
  if (!event) return null;

  const { user } = useContext(AuthContext);
  const [alreadyReserved, setAlreadyReserved] = useState(false);

  useEffect(() => {
    const checkReservation = async () => {
      if (!user || !event?.id) {
        setAlreadyReserved(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/reservations?userId=${user.id}&eventId=${event.id}`
      );

      const data = await response.json();
      setAlreadyReserved(data.length > 0);
    };

    checkReservation();
  }, [user, event?.id]);

  const handleReserve = async () => {
    if (!user) {
      Swal.fire("Debes iniciar sesión para reservar", "", "warning");
      return;
    }

    if (!event?.id) return;

    if (alreadyReserved) {
      Swal.fire("Ya tienes una reserva para este evento", "", "info");
      return;
    }

    if (event.capacity <= 0) {
      Swal.fire("No hay plazas disponibles", "", "error");
      return;
    }

    try {
      await createReservation({
        userId: user.id,
        eventId: event.id
      });

      await updateEventCapacity({
        ...event,
        capacity: event.capacity - 1
      });

      setAlreadyReserved(true);

      Swal.fire("Reserva confirmada", "", "success");

      refreshEvents();

    } catch (error) {
      Swal.fire("Error al reservar", "", "error");
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded-3">
      <div className="card-body d-flex flex-column">

        <h5 className="card-title fw-bold mb-3">
          {event.title}
        </h5>

        <div className="mb-2">
          <span className="text-muted small">Fecha</span>
          <p className="mb-1">{event.date}</p>
        </div>

        <div className="mb-4">
          <span className="text-muted small">Capacidad</span>
          <p className="mb-0">{event.capacity} personas</p>
        </div>

        <button
          className="btn btn-success mt-auto w-100"
          onClick={handleReserve}
          disabled={alreadyReserved || event.capacity <= 0}
        >
          {alreadyReserved
            ? "Ya reservado"
            : event.capacity <= 0
            ? "Sin plazas"
            : "Reservar plaza"}
        </button>

      </div>
    </div>
  );
}