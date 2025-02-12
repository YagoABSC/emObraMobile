import React, { useState, useEffect } from "react";
import { listarServicos } from "../../service/api";

import ContainerForm from "./Containerform";

const Servicos = () => {

    const [servicos, setServicos] = useState([]);

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


    return (
            <div>
                <h3>Agora, escolha os tipos de serviços que deseja oferecer</h3>
                <form className="formServicos">
                    
                    {servicos.length > 0 ? (
                        servicos.map((servico, index) => (
                            <div class="cadastro-pedreiro-checkbox" key={index}>
                                <input type="checkbox" id={servico.nome_servico} name="tipos_servicos" value={servico.id} />
                                <label for={servico.nome_servico}>
                                    <div class="icone-servico">
                                        <img src={`/imgs-fixas/${servico.img_servico}`} alt={servico.nome_servico} />
                                    </div>
                                    <div class="info-servicos-cadastro">
                                        <span>{servico.nome_servico}</span>
                                        <p>{servico.desc_servico}</p>
                                    </div>
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>Carregando...</p>
                    )}
                </form>
            </div>

    )
}

export default Servicos;
