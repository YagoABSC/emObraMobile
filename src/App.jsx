import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Define o tempo de delay para corresponder à animação do loader
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 8000); // Ajuste conforme necessário

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {!showContent ? (
        <div>
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
            
            <div className="loader" style={{marginTop: "30px"}}>
              <p>Contruindo</p>
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
        </div>
      ) : (
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
      )}
    </>
  );
}

export default App;
