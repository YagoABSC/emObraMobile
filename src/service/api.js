import axios from "axios";

export const API_URL = "https://apiobra.vercel.app";
// export const API_URL = "http://localhost:3000";

// Configura o axios para incluir o token no cabeçalho das requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Token no interceptor:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// FLUXO DO PEDREIRO
export const autenticarUsuario = async (identificador, senha) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { identificador, senha });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}


//Cadastrar novo Pedreiro
export const cadastrarPedreiro = async (nome, telefone, cpf, email, senha, cep) => {
  try {
    const response = await axios.post(`${API_URL}/add/pedreiro`, { nome, telefone, cpf, email, senha, cep });
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

// MANIPUTALAÇÃO DE SERVIÇOS

export const listarServicos = async () => {
  try {
    const response = await axios.get(`${API_URL}/tipos/servicos`);
    return response.data;
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}

export const servicosPedreiro = async (pedreiro_id) => {
  try {
    const response = await axios.get(`${API_URL}/pedreiro/tipos-servicos/${pedreiro_id}`);

    return response.data;
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
    throw error;
  }
};

export const vincularServicos = async (pedreiro_id, tipo_servicos) => {
  try {
    const response = await axios.post(`${API_URL}/vincular/servicos`, { pedreiro_id, tipo_servicos });
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

    const response = await axios.get(`${API_URL}/buscar/servicos/${pedreiro_id}`);
    return response.data
  } catch (error) {
    console.error("Erro ao buscar serviços: 124124124", error.response?.data?.message || error.message);
    throw error;
  }
}

export const servicosPrestados = async (pedreiro_id) => {
  try {
    if (!pedreiro_id) {
      throw new Error("Pedreiro não encontrado")
    }

    const response = await axios.get(`${API_URL}/pedreiro/servicos-prestados/${pedreiro_id}`);
    return response.data;

  } catch (error) {
    console.error("Erro ao exibir serviços prestados: ", error.response?.data?.message || error.message);
    throw error;
  }
}

export const aceitarServico = async (servico_id, pedreiro_id) => {
  try {
    const response = await axios.post(`${API_URL}/servicos/aceitar`, { servico_id, pedreiro_id });
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
    throw error;
  }
}

export const finalizarServico = async (servico_id) => {
  try {
    const response = await axios.post(`${API_URL}/servicos/finalizar`, { servico_id });
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
    throw error;
  }
}

// REDEFINIÇÃO DE SENHA

export const solicitarCodigo = async (identificador) => {
  try {
    const response = await axios.post(`${API_URL}/solicitar-codigo`, { identificador });
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
  }
}

export const validarCodigo = async (codigo) => {
  try {
    const response = await axios.post(`${API_URL}/validar-codigo`, { codigo });
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
  }
}

export const redefinirSenha = async (codigo, novaSenha) => {
  try {
    const response = await axios.put(`${API_URL}/redefinir-senha`, { codigo, novaSenha });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Perfil Pedreiro

export const listarPedreiro = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pedreiro/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message)
    throw error;
  }
}

export const atualizarPedreiro = async (id, nome, telefone, email, cep, tipos_servicos) => {
  try {
    console.log("Dados enviados para a API:", { nome, telefone, email, cep, tipos_servicos });
    const response = await axios.put(`${API_URL}/atualizarPedreiro/${id}`, { nome, telefone, email, cep, tipos_servicos });
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
    throw error;
  }
}

export const atualizarFotoPedreiro = async (id, formData) => {
  try {
      const response = await axios.put(`${API_URL}/atualizarFotoPerfil/${id}`, formData);
      return response.data;
  } catch (error) {
      console.error("Erro ao atualizar a foto:", error.response?.data || error.message);
      throw error;
  }
};


// Avaliação Pedreiro
export const listarAvaliacoes = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/avaliacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message)
    throw error;
  }
}

export const totalServicosFinalizados = async(id) => {
  try {
    const response = await axios.get(`${API_URL}/total-servicos-finalizados/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message)
    throw error;
  }
}

export const historicoServicos = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/historico-servicos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro: ", error.response?.data || error.message);
    throw error;
  }
}