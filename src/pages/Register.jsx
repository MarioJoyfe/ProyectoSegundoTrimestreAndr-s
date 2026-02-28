import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000";

export default function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: "user"
        })
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      Swal.fire("Registro correcto", "Ahora puedes iniciar sesión", "success");
      reset();
      navigate("/login");

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registro</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "El email es obligatorio" })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "La contraseña es obligatoria" })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>

        <button className="btn btn-dark w-100" type="submit">
          Registrarse
        </button>

      </form>
    </div>
  );
}