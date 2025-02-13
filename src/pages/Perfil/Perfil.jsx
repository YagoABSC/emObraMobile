import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import { servicosPedreiro } from "../../service/api.js";
import './Perfil.scss';

const Perfil = ({ usuario }) => {
    const [loading, setLoading] = useState(true);
    const [temServicos, setTemServicos] = useState(true);

    useEffect(() => {

        const pedreiro_id = localStorage.getItem("userId"); // Alterado para "userId"

        console.log("ID do pedreiro recuperado:", pedreiro_id);

        if (!pedreiro_id) {
            console.error("ID do pedreiro não encontrado!");
            setLoading(false);
            return;
        }

        const verificarServicos = async () => {
            try {
                const data = await servicosPedreiro(pedreiro_id);
                setTemServicos(data.servicos.length > 0); // Verifica se há serviços vinculados
            } catch (error) {
                console.error("Erro ao verificar serviços:", error);
            } finally {
                setLoading(false);
            }
        };

        verificarServicos();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Bem-vindo ao seu perfil</h1>
            {temServicos ? (
                <p>Você já possui serviços cadastrados.</p>
            ) : (
                <Servicos />
            )}
        </div>
    );
};

export default Perfil;
