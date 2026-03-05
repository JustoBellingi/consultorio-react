import { useState } from "react";
import "./AdminLogin.css";

interface Props {
  onLogin: () => void;
}

function AdminLogin({ onLogin }: Props) {

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const contraseñaSecreta = "Justo0406"; // podés cambiarla

  const handleLogin = () => {

    if (password === contraseñaSecreta) {
      onLogin();
    } else {
      setError("Contraseña incorrecta");
    }

  };

  return (

    <div className="admin-login-container">

      <div className="admin-login-box">

        <h2>Acceso Administrador</h2>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Ingresar
        </button>

        {error && <p className="error">{error}</p>}

      </div>

    </div>

  );
}

export default AdminLogin;