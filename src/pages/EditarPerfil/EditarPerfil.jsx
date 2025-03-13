import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

// Hooks
import useAuth from '../../assets/hooks/UseAuth';

// Componentes
import InputControl from '../../assets/componentes/InputControl'
import PhoneInput from '../../assets/componentes/PhoneInput';
import Loading from '../../assets/componentes/Loading'

import EditarFoto from './EditarFoto';

// Requisições
import { listarPedreiro, atualizarPedreiro, listarServicos, servicosPedreiro } from '../../service/api'

// Icones
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

// CSS
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
  const [form, setForm] = useState("todos");
  const formRef = useRef(null);

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
    setLoading(true);

    // Verifica se houve mudanças nos dados ou nos serviços selecionados
    if (JSON.stringify(dados) === JSON.stringify(originalData) &&
      JSON.stringify(servicosSelecionados) === JSON.stringify(originalData?.tiposServicos?.map(s => s.id))) {
      setLoading(false)
      navigate("/perfil");
      return;
    }

    if (!dados.nome || !dados.telefone || !dados.email || !dados.cep) {
      alert("Preencha todos os campos obrigatórios.");
      setLoading(false)
      return;
    }

    if (servicosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      setLoading(false)
      return;
    }

    try {
      const response = await atualizarPedreiro(pedreiro_id, dados.nome, dados.telefone, dados.email, dados.cep, servicosSelecionados);
      // alert(response.mensagem);
      setLoading(false)
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert(response.mensagem);
    } finally {
      setLoading(false)
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="editar-perfil">
      <div className='editar-acoes'>
        <button type="button" onClick={handleCancel} className="cancelar"><IoIosArrowBack /> <span>Voltar</span></button>
        <button type="button" className="editar-salvar" onClick={() => formRef.current.requestSubmit()}>Salvar  <FaCheck /></button>
      </div>

      <div>
        <h1>Editar Perfil</h1>
      </div>

      <div className="container-opcao">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" checked="" value="todos" onChange={() => setForm("todos")} />
          <label className="tab" htmlFor="radio-1">Todos</label>

          <input type="radio" id="radio-2" name="tabs" value="foto" onChange={() => setForm("foto")} />
          <label className="tab" htmlFor="radio-2">Foto</label>

          <input type="radio" id="radio-3" name="tabs" value="dados" onChange={() => setForm("dados")} />
          <label className="tab" htmlFor="radio-3">Dados</label>

          <input type="radio" id="radio-4" name="tabs" value="servicos" onChange={() => setForm("servicos")} />
          <label className="tab" htmlFor="radio-4">Serviços</label>
          <span className="glider"></span>
        </div>
      </div>


      <div style={{ backgroundColor: "white", padding: "15px", width: "90%" }}>
        {(form === "foto" || form === "todos") && (
          <div className='container-editar-foto'>
            <div className='separador'>
              <span>Foto</span>
              <hr />
            </div>
            <EditarFoto imgAtual={dados.img} nome={dados.nome} />
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit}>
          {(form === "dados" || form === "todos") && (
            <div>
              <div className='separador'>
                <span>Dados Pessoais</span>
                <hr />
              </div>
              <InputControl
                label="Nome"
                id="nome"
                name="nome"
                value={dados?.nome || ""}
                onChange={handleChange}
                required
              />

              <PhoneInput
                label="Telefone"
                value={dados?.telefone || ""}
                onChange={(value) => setDados((prev) => ({ ...prev, telefone: value }))}
                required
              />
              <InputControl
                label="E-mail"
                id="email"
                name="email"
                type="email"
                value={dados?.email || ""}
                onChange={handleChange}
                required
              />
              <InputControl
                label="CEP"
                id="cep"
                name="cep"
                value={dados?.cep || ""}
                onChange={handleChange}
                required
                mask={{ delimiters: ["-"], blocks: [5, 3], numericOnly: true }}
              />
            </div>
          )}
          {(form === "servicos" || form === "todos") && (
            <div>
              <div className='separador'>
                <span>Servicos</span>
                <hr />
              </div>
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
                  <div className="spinnerContainer"></div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;