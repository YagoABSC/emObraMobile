import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verificarToken } from "../../service/api";

const useAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verificarAutenticacao = async () => {
            if (!token) {
                navigate("/login");
                return;
            }


            const usuarioValido = await verificarToken();
            if (!usuarioValido) {
                localStorage.removeItem("token");
                navigate("/login");
                // return;
            }
        };

        verificarAutenticacao();
        
    }, [token, navigate]);
};

export default useAuth;