import { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserReservations, deleteReservation } from "../services/reservationService";
import { getEvents, updateEventCapacity } from "../services/eventService";
import Swal from "sweetalert2";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      const userReservations = await getUserReservations(String(user.id));
      const allEvents = await getEvents();

      setReservations(userReservations);
      setEvents(allEvents);
    };

    loadData();
  }, [user]);

  // 🔹 Crear mapa de eventos para acceso rápido (más eficiente)
  const eventsMap = useMemo(() => {
    const map = {};
    events.forEach(event => {
      map[event.id] = event;
    });
    return map;
  }, [events]);

  const handleCancel = async (reservation) => {
    const event = eventsMap[reservation.eventId];

    if (!event) return;

    try {
      // 1️⃣ Eliminar reserva
      await deleteReservation(reservation.id);

      // 2️⃣ Aumentar capacidad
      await updateEventCapacity({
        ...event,
        capacity: event.capacity + 1
      });

      // 3️⃣ Actualizar estado local SIN reload
      setReservations(prev =>
        prev.filter(r => r.id !== reservation.id)
      );

      setEvents(prev =>
        prev.map(e =>
          e.id === event.id
            ? { ...e, capacity: e.capacity + 1 }
            : e
        )
      );

      Swal.fire("Reserva cancelada", "", "success");

    } catch (error) {
      Swal.fire("Error al cancelar reserva", "", "error");
    }
  };

  return (
    <div className="container py-4 py-md-5">
      <h2 className="mb-3">Panel de Usuario</h2>

      <p className="text-muted">
        Tienes {reservations.length} reserva(s) activa(s)
      </p>

      {reservations.length === 0 ? (
        <div className="alert alert-info">
          No tienes reservas activas.
        </div>
      ) : (
        <ul className="list-group">
          {reservations.map((reservation) => {
            const event = eventsMap[reservation.eventId];

            return (
              <li
                key={reservation.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center"
              >
                <div className="mb-2 mb-md-0">
                  <strong>{event?.title || "Evento no encontrado"}</strong>
                  <div className="text-muted small">
                    {event?.date}
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(reservation)}
                >
                  Cancelar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}