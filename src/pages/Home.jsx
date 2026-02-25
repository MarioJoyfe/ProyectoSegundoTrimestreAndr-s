export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 fw-bold">Bienvenido a EventFlow</h1>
      <p className="lead mt-3">
        Gestiona y reserva eventos de manera profesional.
      </p>

      <div className="row mt-5">
        <div className="col-md-4">
          <h4>Eventos disponibles</h4>
          <p>Explora eventos activos y reserva tu plaza fácilmente.</p>
        </div>

        <div className="col-md-4">
          <h4>Gestión avanzada</h4>
          <p>Los administradores pueden crear y modificar eventos.</p>
        </div>

        <div className="col-md-4">
          <h4>Estadísticas</h4>
          <p>Visualiza métricas y participación en tiempo real.</p>
        </div>
      </div>
    </div>
  );
}