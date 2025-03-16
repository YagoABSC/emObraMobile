import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verificarToken } from "../../service/api";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verificarAutenticacao = async () => {
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const usuarioValido = await verificarToken();
            if (!usuarioValido) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
                return;
            }
        };

        verificarAutenticacao();

        // Impedir que o usuário volte para login
        const handleBackButton = (event) => {
            event.preventDefault();

            if (location.pathname === "/login") {
                navigate("/perfil", { replace: true });
            } else {
                window.history.back();
            }
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };

    }, [token, navigate, location]);
};

export default useAuth;
