import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent
} from "../services/eventService";
import Swal from "sweetalert2";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: events.map((event) => event.title),
    datasets: [
      {
        label: "Capacidad por evento",
        data: events.map((event) => event.capacity),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  return (
    <div className="container py-4 py-md-5">
      <h2 className="mb-4 text-center text-md-start">
        Panel de Administración
      </h2>

      <div className="row g-4">
        {/* 🔹 Formulario */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm p-3 p-md-4 h-100">
            <h5 className="mb-3">
              {editingEvent ? "Editar evento" : "Crear nuevo evento"}
            </h5>

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
        </div>

        {/* 🔹 Lista y gráfico */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm p-3 p-md-4 mb-4">
            <h5 className="mb-3">Eventos actuales</h5>

            <ul className="list-group">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center"
                >
                  <span className="mb-2 mb-md-0">
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

          <div className="card shadow-sm p-3 p-md-4">
            <h5 className="mb-3">Estadísticas</h5>
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}