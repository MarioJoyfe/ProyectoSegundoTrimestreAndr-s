import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import Swal from "sweetalert2";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);
      login(user);

      Swal.fire({
        icon: "success",
        title: "Login correcto",
        text: "Bienvenido a EventFlow"
      });

      // Redirección según rol
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Iniciar sesión</h2>

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
          Entrar
        </button>
      </form>
    </div>
  );
}