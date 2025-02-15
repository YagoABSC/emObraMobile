import React, {useState, useEffect} from "react";
import { servicosPrestados } from "../../service/api";

const ServicosPrestados = () => {

    const [servPrestados, setServPrestados] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const pedreiro_id = localStorage.getItem("pedreiro_id");
        console.log("Id do pedreiro: ",pedreiro_id);

        if(!pedreiro_id){
            console.error("ID do pedreiro não encontrado.");
            setLoading(false);
            return;
        };

        const carregarServicos = async () => {
            try {
                const response = await servicosPrestados(pedreiro_id);
                setServPrestados(response.servPrestados || []);
            } catch (error) {
                console.error("Erro ao buscar serviços prestados:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarServicos();

    }, []);

    if (loading) return <p>Carregando...</p>;

    return(
        <div>
            <h3>Serviços em andamento</h3>
            {servPrestados.length > 0 ?(
                <div>
                    {servPrestados.map(servPrestado => (
                        <div key={servPrestado.id}>
                            <p>Descrição: {servPrestado.descricao}</p>
                            <p>Prazo: {servPrestado.prazo}</p>
                            <p>Valor: {servPrestado.valor}</p>
                            <p>Status: {servPrestado.status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Sem serviços em andamento</p>
            )}
        </div>
    )
}

export default ServicosPrestados;
