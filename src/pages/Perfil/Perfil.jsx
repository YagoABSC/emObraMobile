import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import { servicosPedreiro } from "../../service/api.js";
import './Perfil.scss';

const Perfil = ({ pedreiro_id }) => {

    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(localStorage.getItem("token"));

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await servicosPedreiro(pedreiro_id);
                setServicos(response.servicos || []);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, [pedreiro_id]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            {servicos.length === 0 ? <Servicos /> : <h1>Bem vindo</h1>}
        </div>
    );
};

export default Perfil;
