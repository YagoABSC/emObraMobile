import axios from "axios";


// Configura o axios para incluir o token no cabeçalho das requisições
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export const autenticarUsuario = async (identificador, senha) => {
    try {
        const response = await axios.post("http://localhost:3000/user/login", { identificador, senha });
        return response.data;
    } catch (error) {
        console.error('Erro:', error.response?.data || error.message);
        throw error;
    }
}