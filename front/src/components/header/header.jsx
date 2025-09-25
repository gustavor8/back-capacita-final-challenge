import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="header">
      <figure>
        <img src={logo} alt="Logo MCTI Futuro" className="rounded " />
        <figcaption>
          Projeto <span className="digitando">Full Stack Intermediário</span>
        </figcaption>
      </figure>

      <nav>
        <ul>
          <li>
            <Link to="/homePage">Início</Link>
          </li>
          <li>
            <Link to="/contacts">Contatos</Link>
          </li>
          {token && (
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
