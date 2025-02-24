import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listarPedreiro, atualizarPedreiro, listarServicos, servicosPedreiro } from '../../service/api'
import useAuth from '../../assets/hooks/UseAuth';
import './Editar.scss';

const EditarPerfil = () => {

  useAuth();

  const navigate = useNavigate();
  const pedreiro_id = localStorage.getItem("pedreiro_id");
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [dados, setDados] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const allServicos = async () => {
      try {
        const data = await listarServicos();
        setServicos(data);
      } catch (error) {
        console.error("Erro ao carregar serviços")
      }
    };

    allServicos();
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (!pedreiro_id) {
          setError("ID do pedreiro não encontrado.");
          setLoading(false);
          return;
        }

        const pedreiro = await listarPedreiro(pedreiro_id); // Passa o ID armazenado
        setDados(pedreiro);
        setOriginalData(pedreiro);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    carregarDados();
  }, [pedreiro_id]);

  useEffect(() => {
    const carregarServicosVinculados = async () => {
      try {
        if (!pedreiro_id) return;

        const response = await servicosPedreiro(pedreiro_id);
        const servicosVinculados = response.tiposServicos.map(servico => servico.id);

        setServicosSelecionados(servicosVinculados);
      } catch (error) {
        console.error("Erro ao carregar serviços vinculados:", error);
      }
    };

    carregarServicosVinculados();
  }, [pedreiro_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dados.nome || !dados.telefone || !dados.email || !dados.cep) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Verifique se o array está no formato correto antes do envio
    console.log("Serviços enviados:", servicosSelecionados);

    try {
      await atualizarPedreiro(pedreiro_id, dados.nome, dados.telefone, dados.email, dados.cep, servicosSelecionados);
      alert("Perfil atualizado com sucesso!");
      navigate("/perfil");
    } catch (error) {
      alert("Erro ao atualizar os dados.");
    }
  };


  // Cancela o edição de perfil
  const handleCancel = () => {
    if (JSON.stringify(dados) !== JSON.stringify(originalData)) {
      const confirmacao = window.confirm("Suas alterações não foram salvas. Deseja sair?");
      if (!confirmacao) return;
    }
    navigate("/perfil");
  };


  // Deixa selecionado os serviços já vinculados
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let novosSelecionados = [...servicosSelecionados];

    if (checked) {
      if (novosSelecionados.length >= 3) {
        alert("Você só pode selecionar até 3 serviços.");
        return;
      }
      novosSelecionados.push(parseInt(value)); // Convertendo para número
    } else {
      novosSelecionados = novosSelecionados.filter(id => id !== parseInt(value));
    }

    setServicosSelecionados(novosSelecionados);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="editar-perfil">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={dados.nome} onChange={handleChange} required />

        <label>Telefone:</label>
        <input type="text" name="telefone" value={dados.telefone} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={dados.email} onChange={handleChange} required />

        <label>CEP:</label>
        <input type="text" name="cep" value={dados.cep} onChange={handleChange} required />

        <div className="radio-inputs">
          {servicos.length > 0 ? (
            servicos.map((servico) => (
              <label key={servico.id}>
                <input
                  className="radio-input"
                  type="checkbox"
                  name="tipo_servicos"
                  value={servico.id}
                  onChange={handleCheckboxChange}
                  checked={servicosSelecionados.includes(servico.id)}
                  disabled={!servicosSelecionados.includes(servico.id) && servicosSelecionados.length >= 3}
                />
                <span className="radio-tile">
                  <span className="radio-icon">
                    <img src={`/imgs-fixas/${servico.img_servico}`} alt={servico.nome_servico} />
                  </span>
                  <span className="radio-label">{servico.nome_servico}</span>
                </span>
              </label>
            ))
          ) : (
            <p>Carregando...</p>
          )}
        </div>


        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={handleCancel} className="cancelar">Cancelar</button>
      </form>
    </div>
  );
};

export default EditarPerfil;