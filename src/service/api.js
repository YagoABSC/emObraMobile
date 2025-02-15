import axios from "axios";

const API_URL = "https://apiobra.vercel.app";

// Configura o axios para incluir o token no cabeçalho das requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Token no interceptor:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Login
export const autenticarUsuario = async (identificador, senha) => {
  try {
    const response = await axios.post("https://apiobra.vercel.app/user/login", { identificador, senha });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}


//Cadastrar novo Pedreiro
export const cadastrarPedreiro = async (nome, telefone, cpf, email, senha, cep) => {
  try {
    const response = await axios.post("https://apiobra.vercel.app/add/pedreiro", { nome, telefone, cpf, email, senha, cep });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

export const listarServicos = async () => {
  try {
    const response = await axios.get("https://apiobra.vercel.app/tipos/servicos");
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

export const servicosPedreiro = async (pedreiro_id) => {
  try {
    const response = await axios.get(`https://apiobra.vercel.app/pedreiro/tipos-servicos/${pedreiro_id}`);

    return response.data;
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const vincularServicos = async (pedreiro_id, tipo_servicos) => {
  try {
    const response = await axios.post("https://apiobra.vercel.app/vincular/servicos", { pedreiro_id, tipo_servicos });
    return response.data
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message)
    throw error;
  }
}

export const buscarServicos = async (pedreiro_id) => {
  try {

    if (!pedreiro_id) {
      throw new Error("ID do pedreiro não foi fornecido.");
    }

    const response = await axios.get(`https://apiobra.vercel.app/buscar/servicos/${pedreiro_id}`);
    return response.data
  } catch (error) {
    console.error("Erro ao buscar serviços:", error.response?.data?.message || error.message);
    throw error;
  }
}

export const servicosPrestados = async (pedreiro_id) => {
  try {
    if(!pedreiro_id){
      throw new Error("Pedreiro não encontrado")
    }

    const response = await axios.get(`https://apiobra.vercel.app/pedreiro/servicos-prestados/${pedreiro_id}`);
    return response.data;

  } catch (error) {
    console.error("Erro ao exibir serviços prestados: ", error.response?.data?.message || error.message);
    throw error;
  }
}