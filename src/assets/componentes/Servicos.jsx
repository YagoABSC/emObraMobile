import React, { useState, useEffect } from "react";
import { listarServicos } from "../../service/api";

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

    const [exibirServicos, setExibirServicos] = useState('pt1');


    return (


            <div>
                <h3>Agora, escolha os tipos de serviços que deseja oferecer</h3>
                <form className="formServicos">
                    
                    {servicos.length > 0 ? (
                        servicos.map((servico, index) => (
                            <div className="cadastro-pedreiro-checkbox" key={index}>
                                <input type="checkbox" id={servico.nome_servico} name="tipos_servicos" value={servico.id} />
                                <label htmlFor={servico.nome_servico}>
                                    <div className="icone-servico">
                                        <img src={`/imgs-fixas/${servico.img_servico}`} alt={servico.nome_servico} />
                                    </div>
                                    <div className="info-servicos-cadastro">
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
