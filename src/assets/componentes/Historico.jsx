import React, {useState, useEffect} from "react";
import { historicoServicos } from "../../service/api";


const Historico = () => {

    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState (true);
    const pedreiro_id = localStorage.getItem("pedreiro_id")

    useEffect(() =>{
    
            const fetchHistorico = async () =>{
                try {
                    const response = await historicoServicos(pedreiro_id);
                    setHistorico(response.historico || []);
                } catch (error) {
                    console.error("Erro ao buscar histórico: ", error);
                } finally{
                    setLoading(false);
                }
            };

            fetchHistorico();  
    }, [pedreiro_id]);

    if (loading) return <div>
        <p style={{ textAlign: "center", marginBottom: 10, color: "#020411", fontSize: 16, fontWeight: 600 }}>Organizando seu histórico</p>
        <div className="spinner"></div>
    </div>;

    return (
        <div>
            <h3 className="titulo-categorias">Histórico de Serviços</h3>

            <div>
                {historico.length > 0 ? (
                    <div>
                        {historico.map(history =>(
                            <div key={history.id} className="historico-servico" >

                                    <div className="cabecalho-servico">
                                        <div className="tipo-servico">
                                            <p>{history.nome_servico}</p>
                                        </div>
                                        
                                        <span className="status-servico">Valor {history.valor}</span>

                                    </div>

                                    <div className="info-servico">
                                        <p className="descricao-servico">{history.descricao}</p>
                                    </div>

                                    <div className="local-servico">
                                        <p>{history.endereco} - {history.bairro}</p>
                                    </div>

                                    <hr style={{ margin: "20px auto", border: "solid 1px orange", width: "90%" }}/>

                                    <div className="prazo-servico">
                                        <span>Prazo</span>
                                        <p>{history.prazo}</p>
                                    </div>

                                    <div className="prazo-servico">
                                        <span>Finalizado em</span>
                                        <p>{history.data_final}</p>

                                    </div>

                                    <div className="linha-tempo-servico">

                                    </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum serviço concluído</p>
                )}
            </div>
        </div>
    )
}

export default Historico;