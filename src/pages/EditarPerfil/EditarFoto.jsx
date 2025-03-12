import React, { useState } from "react";

// Requisições
import { atualizarFotoPedreiro } from "../../service/api";

// CSS
import "./Editar.scss";

const EditarFoto = ({ imgAtual, nome }) => {
    const imagemPadrao = "/img-perfil/avatar-pedreiro.jpg"; // Caminho da imagem padrão
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(localStorage.getItem("pedreiro_img") || imgAtual || imagemPadrao);
    const [tempPreview, setTempPreview] = useState(null); // Estado para pré-visualização temporária
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(false);
    const pedreiroId = localStorage.getItem("pedreiro_id");
    

    const handleFileChange = (event) => {
        const arquivoSelecionado = event.target.files[0];

        if (arquivoSelecionado) {
            setFile(arquivoSelecionado);
            setTempPreview(URL.createObjectURL(arquivoSelecionado)); // Armazena preview temporário
            setModalAberto(true);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("❌ Nenhum arquivo selecionado!");
            return;
        }

        setLoading(true); // Ativar loading

        const formData = new FormData();
        formData.append("imagem", file);

        try {
            const resposta = await atualizarFotoPedreiro(pedreiroId, formData);
            console.log("✅ Foto atualizada com sucesso:", resposta);

            localStorage.setItem("pedreiro_img", resposta.img_perfil || imagemPadrao);

            setPreview(resposta.img_perfil || imagemPadrao); // Atualiza o preview final
            setModalAberto(false);
            setTempPreview(null); // Limpa o preview temporário após salvar
        } catch (erro) {
            console.error("❌ Erro ao salvar a foto:", erro);
        } finally {
            setLoading(false); // Desativar loading
        }
    };

    const handleCancelar = () => {
        setTempPreview(null); // Descarta a pré-visualização temporária
        setModalAberto(false);
    };

    return (
        <div className="editar-img">
            {loading ? (
                <div className="spinner"></div> // Exibe loading enquanto estiver processando
            ) : (
                <>  
                    <img src={preview} alt={nome} />
                    <label htmlFor="upload-img" className="botao-overlay">Editar foto</label>
                    <input type="file" id="upload-img" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

                    {modalAberto && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>Pré-visualização</h3>
                                <img src={tempPreview || preview} alt="Pré-visualização" className="modal-img" />
                                <div className="modal-botoes">
                                    <button className="btn cancelar botao-entrar" onClick={handleCancelar}>Cancelar</button>
                                    <button className="btn salvar botao-entrar" onClick={handleUpload}>Salvar Foto</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EditarFoto;
