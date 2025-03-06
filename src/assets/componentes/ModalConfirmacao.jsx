import React, { useState } from "react";
import Modal from "react-modal"; // Biblioteca react-modal
import { FaCheck } from "react-icons/fa";

Modal.setAppElement("#root");

const ModalConfirmacao = ({ isOpen, onClose, onConfirm }) => {
    const [statusFinalizado, setStatusFinalizado] = useState(false);

    const handleConfirmar = () => {
        // Aqui você executaria a lógica para finalizar o serviço
        onConfirm(); // Função que finaliza o serviço
        setStatusFinalizado(true); // Altera o estado para "finalizado"
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmação de Finalização"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-conteudo">
                <h2>{statusFinalizado ? "Parabéns!" : "Você tem certeza que deseja finalizar?"}</h2>
                <p>
                    {statusFinalizado
                        ? "Parabéns por mais um serviço finalizado. Enviamos o seu pedido de finalização para o Contratante. Aguarde a confirmação."
                        : "Ao finalizar, o serviço será encerrado e não poderá ser reaberto. O serviço ficará em aguardo até o contratante confirmar a finalização."}
                </p>

                <div className="botoes-modal">
                    {!statusFinalizado ? (
                        <>
                                <button onClick={onClose} className="cancelar-btn botao-entrar contato-servico">
                                    Cancelar
                                </button>

                                <button onClick={handleConfirmar} className="confirmar-btn botao-entrar finalizar-servico">
                                    Confirmar
                                </button>
                        </>
                    ) : (
                        <button onClick={onClose} className="fechar-btn">
                            Fechar
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmacao;
