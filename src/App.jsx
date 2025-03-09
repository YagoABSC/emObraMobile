import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { verificarToken } from "./service/api";

function App() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const tokenValido = await verificarToken(); // Verifica se o token ainda é válido

      setTimeout(() => {
        setShowContent(true);

        if (tokenValido) {
          navigate("/perfil"); // Se o token for válido, redireciona para o perfil
        }
      }, 8000); // Tempo da animação
    };

    verificarAutenticacao();
  }, [navigate]);

  if (!showContent) {
    return (
      <div className="spinnerContainer">
        <div className="banner-logo">
          <h1>
            <a href="/">
              <img
                src="https://i.ibb.co/KVZRVhw/logov4-preto.png"
                alt="logo-em-obra"
                className="logo-header"
              />
            </a>
          </h1>
        </div>
        <div className="loader">
        <p>Construindo</p>
          
          <div className="words">
            <span className="word"></span>
            <span className="word">pontes</span>
            <span className="word">caminhos</span>
            <span className="word">oportunidades</span>
            <span className="word">o seu sonho!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`begin-container ${showContent ? "fade-in" : ""}`}>
      <div className="banner-logo">
        <h1>
          <a href="/">
            <img
              src="https://i.ibb.co/KVZRVhw/logov4-preto.png"
              alt="logo-em-obra"
              className="logo-header"
            />
          </a>
        </h1>
      </div>

      <div className="begin-btns">
          <h3 style={{ color: "white", textAlign: "center" }}>
            Facilitando conexões, construindo sonhos.
          </h3>
        <Link to="/cadastro">
          <button className="botao-entrar">Criar uma conta</button>
        </Link>

        <Link to="/login">
          <button
            className="botao-entrar"
            style={{ backgroundColor: "white", color: "#FE8813" }}
          >
            Já possuo conta
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
