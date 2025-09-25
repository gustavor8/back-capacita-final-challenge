import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        login: form.email,
        password: form.password,
        nome: form.nome,
      };
      await axios.post("http://localhost:3000/api/register", payload);
      setSuccess("Usuário registrado com sucesso!");
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erro no cadastro");
      setSuccess("");
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend><b>Cadastro de Usuário</b></legend>
          <div className="inputBox">
            <input
              type="text"
              name="nome"
              className="inputUser"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <label className="labelInput">Nome completo</label>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="email"
              className="inputUser"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label className="labelInput">Email</label>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              className="inputUser"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label className="labelInput">Senha</label>
          </div>
          <input type="submit" id="submit" value="Cadastrar" />
        </fieldset>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "lightgreen" }}>{success}</p>}

      <p style={{ marginTop: "10px", textAlign: "center", color: "#fff" }}>
        Já possui uma conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
