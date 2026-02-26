export default function EventCard({ event }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          <strong>Fecha:</strong> {event.date}
        </p>
        <p className="card-text">
          <strong>Capacidad:</strong> {event.capacity}
        </p>
      </div>
    </div>
  );
}