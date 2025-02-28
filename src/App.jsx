import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Define o tempo de delay para corresponder à animação do loader
    const timeout = setTimeout(() => {
      setShowContent(true);

      // Após a intro, verifica se há um token e navega para o perfil
      if (token) {
        navigate("/perfil");
        console.log(token);
      }
    }, 8000); // Ajuste conforme necessário

    return () => clearTimeout(timeout);
  }, [token, navigate]); // Adicione token e navigate como dependências

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

        <div className="loader" style={{ marginTop: "30px" }}>
          <p>Construindo</p>
          <div className="words">
            <span className="word"></span>
            <span className="word">pontes</span>
            <span className="word">caminhos</span>
            <span className="word">oportunidades</span>
            <span className="word">o seu sonho!</span>
          </div>
        </div>
        <div className="spinner"></div>
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
        <div className="banner-logo">
          <h3 style={{ color: "white" }}>
            Facilitando conexões, construindo sonhos.
          </h3>
        </div>
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
