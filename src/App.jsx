import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 segundos para exibir o loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinnerContainer">
          <div className="spinner"></div>
          <div className="loader">
            <p>loading</p>
            <div className="words">
              <span className="word">posts</span>
              <span className="word">images</span>
              <span className="word">followers</span>
              <span className="word">hashtags</span>
              <span className="word">posts</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="begin-container">
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
