import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getEvents, createEvent, deleteEvent, updateEvent } from "../services/eventService";
import Swal from "sweetalert2";

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const onSubmit = async (data) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, {
        ...editingEvent,
        ...data,
        capacity: Number(data.capacity)
      });

      Swal.fire("Actualizado", "Evento actualizado correctamente", "success");
      setEditingEvent(null);
    } else {
      await createEvent({
        title: data.title,
        date: data.date,
        capacity: Number(data.capacity)
      });

      Swal.fire("Evento creado", "El evento se ha creado correctamente", "success");
    }

    reset();
    loadEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    Swal.fire("Eliminado", "Evento eliminado correctamente", "success");
    loadEvents();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);

    setValue("title", event.title);
    setValue("date", event.date);
    setValue("capacity", event.capacity);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administración</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <h4>{editingEvent ? "Editar evento" : "Crear nuevo evento"}</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título del evento"
              {...register("title", { required: true })}
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              {...register("date", { required: true })}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Capacidad"
              {...register("capacity", { required: true })}
            />
          </div>

          <button className="btn btn-dark w-100">
            {editingEvent ? "Actualizar Evento" : "Crear Evento"}
          </button>
        </form>
      </div>

      <h4>Eventos actuales</h4>

      <ul className="list-group">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {event.title} - {event.date} - Capacidad: {event.capacity}
            </span>

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(event)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(event.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}