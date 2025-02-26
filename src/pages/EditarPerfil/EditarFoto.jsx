import React, { useState } from "react";
import { atualizarFotoPedreiro } from "../../service/api";
import "./Editar.scss"; // Arquivo de estilo para o modal
import { API_URL } from "../../service/api";

const EditarFoto = ({ imgAtual, nome }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const pedreiroId = localStorage.getItem("pedreiro_id");

    // Função chamada ao selecionar uma nova imagem
    const handleFileChange = (event) => {
        const arquivoSelecionado = event.target.files[0];

        if (arquivoSelecionado) {
            setFile(arquivoSelecionado);
            setPreview(URL.createObjectURL(arquivoSelecionado)); // Cria pré-visualização da imagem
            setModalAberto(true); // Abre o modal automaticamente
        }
    };

    // Função para salvar a nova foto
    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("img_perfil", file);

        // 🔍 Debug: Verificando o FormData antes do envio
        console.log("📸 Arquivo a ser enviado:", file);
        for (let pair of formData.entries()) {
            console.log("🔍 FormData:", pair[0], pair[1]);
        }

        try {
            await atualizarFotoPedreiro(pedreiroId, formData);

            alert("Foto atualizada com sucesso!");
            setModalAberto(false);
            window.location.reload();
        } catch (error) {
            console.error("❌ Erro ao salvar a foto:", error);
            alert("Erro ao salvar a foto.");
        }
    };


    return (
        <div className="editar-img">
            {/* Imagem Atual */}
            <img src={`${API_URL}/imgs-pedreiro/${imgAtual}`} alt={nome} />

            {/* Input para selecionar a nova imagem */}
            <label htmlFor="upload-img" className="botao-overlay">Editar foto</label>
            <input
                type="file"
                id="upload-img"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            {/* Modal de Pré-visualização */}
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
        </div>
    );
};

export default EditarFoto;
