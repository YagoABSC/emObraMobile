import React, { useState, useEffect } from "react";
import { listarServicos, vincularServicos } from "../../service/api";

const Servicos = ({ pedreiro_id }) => {

    const [servicos, setServicos] = useState([]);
    const [servicosSelecionados, setServicosSelecionados] = useState([]);

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

        if (!pedreiro_id) {
            alert("Erro: ID do pedreiro não encontrado.");
            return;
        }

        if (servicosSelecionados.length === 0) {
            alert("Selecione pelo menos um serviço!");
            return;
        }

        const payload = {
            pedreiro_id,
            tipo_servicos: servicosSelecionados
        };

        console.log("Enviando para API:", payload);

        try {
            const response = await vincularServicos(pedreiro_id, servicosSelecionados);
            alert(response.message); // Exibe mensagem de sucesso
        } catch (error) {
            alert("Erro ao vincular serviços. " + (error.response?.data?.message || ""));
        }
    };

    return (


        <div>
            <h3>Agora, escolha os tipos de serviços que deseja oferecer</h3>
            <form className="formServicos radio-inputs" onSubmit={handleSubmit}>


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

                <button disabled={!pedreiro_id} onClick={handleSubmit}>
                    Cadastrar Serviços
                </button>
            </form>
        </div>

    )
}

export default Servicos;
