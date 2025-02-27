import React, { useState } from "react";
import { atualizarFotoPedreiro } from "../../service/api";
import "./Editar.scss";

const EditarFoto = ({ imgAtual, nome }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(imgAtual || "");
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(false); // Estado para exibir o loading
    const pedreiroId = localStorage.getItem("pedreiro_id");

    const handleFileChange = (event) => {
        const arquivoSelecionado = event.target.files[0];

        if (arquivoSelecionado) {
            setFile(arquivoSelecionado);
            setPreview(URL.createObjectURL(arquivoSelecionado));
            setModalAberto(true);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("❌ Nenhum arquivo selecionado!");
            return;
        }

        console.log("📂 Enviando arquivo:", file);
        setLoading(true); // Ativar loading

        const formData = new FormData();
        formData.append("imagem", file);

        try {
            const resposta = await atualizarFotoPedreiro(pedreiroId, formData);
            console.log("✅ Foto atualizada com sucesso:", resposta);

            setPreview(resposta.img_perfil); // Atualiza a foto no perfil
            setModalAberto(false); // Fecha o modal após sucesso
        } catch (erro) {
            console.error("❌ Erro ao salvar a foto:", erro);
        } finally {
            setLoading(false); // Desativar loading
        }
    };

    return (
        <div className="editar-img">
            {loading ? (
                // Exibir loading enquanto a foto estiver sendo enviada
                <div className="spinner"></div>
            ) : (
                <>
                    <img src={preview} alt={nome} />
                    <label htmlFor="upload-img" className="botao-overlay">Editar foto</label>
                    <input type="file" id="upload-img" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

                    {modalAberto && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>Pré-visualização</h3>
                                <img src={preview} alt="Pré-visualização" className="modal-img" />
                                <div className="modal-botoes">
                                    <button className="btn cancelar botao-entrar" onClick={() => setModalAberto(false)}>Cancelar</button>
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
