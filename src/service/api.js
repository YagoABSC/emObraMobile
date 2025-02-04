import axios from "axios";

export const autenticarUsuario = async (identificador, senha) => {
    try {
        const response = await axios.post("http://localhost:3000/user/login", { identificador, senha });
        return response.data;
    } catch (error) {
        console.error('Erro:', error.response?.data || error.message);
        throw error;
    }
}