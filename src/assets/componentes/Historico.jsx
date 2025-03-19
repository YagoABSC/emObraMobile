import React, { useState, useEffect } from "react";

// Requisições
import { historicoServicos } from "../../service/api";

// Icones
import { MdDateRange, MdMapsHomeWork, MdAttachMoney, MdPlace  } from "react-icons/md";



const Historico = () => {

    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);
    const pedreiro_id = localStorage.getItem("pedreiro_id")

    useEffect(() => {

        const fetchHistorico = async () => {
            try {
                const response = await historicoServicos(pedreiro_id);
                setHistorico(response.historico || []);
            } catch (error) {
                console.error("Erro ao buscar histórico: ", error);
            } finally {
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
                        {historico.map(history => (
                            <div key={history.id} className="historico-servico" >

                                {/* <div>
                                    <div className="cabecalho-servico">
                                        <div className="tipo-servico">
                                            <p>Tipo de serviço</p>
                                            <span>{history.nome_servico}</span>
                                        </div>
                                        <span className="status-servico">Valor {history.valor} </span>
                                    </div>
                                    <div className="info-servico">
                                        <p className="descricao-servico">{history.descricao}</p>
                                    </div>
                                    <div className="local-servico">
                                        <p>{history.endereco} - {history.bairro}</p>
                                    </div>
                                    <hr style={{ margin: "20px auto", border: "solid 1px orange", width: "90%" }} />
                                    <div className="prazo-servico">
                                        <span>Prazo</span>
                                        <p>{history.prazo}</p>
                                    </div>
                                    <div className="prazo-servico">
                                        <span>Finalizado em</span>
                                        <p>{history.data_final}</p>
                                    </div>
                                </div> */}

                                <div className="img-historico"><img src={`./imgs-fixas/${history.img_servico}`} alt="" /></div>

                                <div className="info-historico">

                                    <div className="header-info-historico">
                                        <p><MdDateRange style={{color: "#020411"}}  className="icone-historico"/>  {history.data_final}</p>
                                        <span style={{color: "#FE8813"}}> {history.valor}</span>
                                    </div>

                                    <div className="sobre-servico-historico">
                                        <p><MdMapsHomeWork style={{color: "#FE8813"}} className="icone-historico"/>  {history.nome_servico}</p>
                                        <span>{history.descricao}</span>
                                    </div>

                                    <p><MdPlace style={{color: "#020411"}} className="icone-historico"/>  {history.bairro}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : ( 
                    <div className="container-ilustracoes">
                        <div className="ilustracoes">
                            <img src="/imgs-fixas/nada_encontrado.png" alt="Nada encontrado" className="ilustracao" />
                        </div>

                        <div className="info-ilustracoes" >
                            <p>Você ainda não possui serviços concluídos. Mas temos certeza que isso acontecerá em breve!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Historico;