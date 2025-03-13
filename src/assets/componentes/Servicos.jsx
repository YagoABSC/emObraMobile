import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Requisições
import { listarServicos, vincularServicos } from "../../service/api";

// Hooks
import useAuth from "../hooks/UseAuth";

// Componentes
import Loading from "./Loading"

const Servicos = ({ pedreiro_id }) => {

    useAuth();

    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const pedreiro = localStorage.getItem('pedreiro_id');


    useEffect(() => {
        const allServicos = async () => {
            try {
                const data = await listarServicos();
                setServicos(data);
                console.log(pedreiro)
            } catch (error) {
                console.error("Erro ao carregar serviços")
            }
        };

        allServicos();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        if (!pedreiro) {
            alert("Erro: ID do pedreiro não encontrado.");
            setIsLoading(false);
            return;
        }
    
        if (servicosSelecionados.length === 0) {
            alert("Selecione pelo menos um serviço!");
            setIsLoading(false);
            return;
        }
    
        try {
            const response = await vincularServicos(pedreiro, servicosSelecionados);
            alert(response.message); 
            
            // Chamar a função passada via props para atualizar o perfil
            navigate("/perfil") 
            
        } catch (error) {
            alert("Erro ao vincular serviços. " + (error.response?.data?.message || ""));
        } finally {
            setIsLoading(false);
        }
    };
    

    return (

        <div >

            <div className="banner-logo" style={{ marginTop: 20 }}>
                <h1><a href="/"><img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo-em-obra"
                    className="logo-header" /></a></h1>
            </div>
            <form className="formServicos radio-inputs" onSubmit={handleSubmit}>
                <div className="escolher-servico">
                    <h3 >Agora, escolha os tipos de serviços que deseja oferecer</h3>
                    <p>Só é permitido escolher <strong>3 tipos de serviços</strong></p>
                </div>


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

                {servicosSelecionados.length === 3 && (<div className="botoes-selecionar-servicos">
                    <button type="button" disabled={!pedreiro} onClick={handleSubmit} className="botao-entrar">
                        Cadastrar Serviços
                    </button>
                </div>)}
            </form>
            {isLoading && (
                <Loading />
            )}
        </div>



    );
}

export default Servicos;
