import axios from "axios";


// Configura o axios para incluir o token no cabeçalho das requisições
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

//Login
export const autenticarUsuario = async (identificador, senha) => {
    try {
        const response = await axios.post("http://localhost:3000/user/login", { identificador, senha });
        return {
          token: response.data.token,
          id: response.data.user.id
        };
    } catch (error) {
        console.error('Erro:', error.response?.data || error.message);
        throw error;
    }
}


//Cadastrar novo Pedreiro
export const cadastrarPedreiro = async(nome, telefone, cpf, email, senha, cep) => {
  try {
    const response = await axios.post("http://localhost:3000/add/pedreiro",{nome, telefone, cpf, email, senha, cep});
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

export const listarServicos = async() =>{
  try {
    const response = await axios.get("http://localhost:3000/tipos/servicos");
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}