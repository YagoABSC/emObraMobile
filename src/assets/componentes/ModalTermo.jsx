import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalTermo = ({ isOpen, onClose, onConfirm, formData }) => {
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [aceitouDados, setAceitouDados] = useState(false);
    const [erroTermos, setErroTermos] = useState(false);
    const [erroDados, setErroDados] = useState(false);

    const handleConfirmar = () => {
        // Validar os checkboxes
        if (!aceitouTermos || !aceitouDados) {
            setErroTermos(!aceitouTermos);
            setErroDados(!aceitouDados);
            return;
        }

        onConfirm(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Termos e Condições"
            className="modal-termo"
            overlayClassName="modal-overlay"
        >
            <div className="modal-conteudo-termo">
                <h2>Termos e Condições</h2>
                <div className="termos-texto-modal">

                    <h3>1. Introdução</h3>
                    <p>Bem-vindo ao Em Obra.com. Este aplicativo foi desenvolvido para conectar pedreiros a contratantes, permitindo que profissionais possam ser encontrados para serviços ou encontrem oportunidades de trabalho dentro da plataforma. Ao se cadastrar, você concorda com os termos e condições descritos abaixo, incluindo o uso e proteção de seus dados pessoais, conforme estabelecido pela Lei Geral de Proteção de Dados Pessoais (LGPD - Lei 13.709/2018).</p>

                    <h3>2. Coleta e Uso de Dados Pessoais</h3>
                    <p>Para garantir a melhor experiência dentro da plataforma, coletamos os seguintes dados pessoais:</p>

                    <ul>
                        <li>Nome completo e CPF: Para identificação única e segurança na plataforma.</li>
                        <li>Telefone: Utilizado para comunicação de avisos e para permitir que contratantes entrem em contato com pedreiros, o que pode tornar o número público em determinadas situações.</li>
                        <li>CEP: Para delimitação do raio de atuação do profissional e para exibir serviços compatíveis com a localização do usuário.</li>
                    </ul>

                    <p>Os dados coletados serão utilizados exclusivamente para os propósitos do funcionamento do aplicativo e não serão comercializados ou repassados sem autorização do usuário.</p>

                    <h3>3. Consentimento e Bases Legais</h3>
                    <p>Ao se cadastrar na plataforma, o usuário concorda com o uso de seus dados pessoais para fins de execução do serviço, de acordo com o artigo 7º da LGPD. A base legal para o tratamento dos dados é a execução do contrato e o legítimo interesse de conectar pedreiros a contratantes.</p>

                    <h3>4. Direitos dos Titulares de Dados</h3>
                    <p>Os usuários têm direito a:</p>
                    <ul>
                        <li>Solicitar confirmação da existência de tratamento de seus dados.</li>
                        <li>Acessar seus dados pessoais armazenados na plataforma.</li>
                        <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                        <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                        <li>Requerer portabilidade dos dados.</li>
                        <li>Revogar o consentimento a qualquer momento.</li>
                    </ul>

                    <h3>5. Segurança dos Dados</h3>
                    <p>Implementamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou qualquer forma de uso indevido. Entretanto, é importante que os usuários também protejam suas informações, evitando compartilhar dados de login e utilizando senhas seguras.</p>

                    <h3>6. Compartilhamento de Dados</h3>
                    <p>Os dados pessoais podem ser compartilhados com:</p>
                    <ul>
                        <li>Prestadores de serviço que auxiliam na operação da plataforma.</li>
                        <li>Contratantes, nos casos em que o contato entre as partes é necessário para o fechamento de serviços.</li>
                        <li>Autoridades competentes, caso haja exigência legal.</li>
                    </ul>

                    <h3>7. Retenção de Dados</h3>
                    <p>Os dados pessoais serão armazenados pelo tempo necessário para cumprir os propósitos do aplicativo ou até que o usuário solicite a exclusão de sua conta. Alguns dados podem ser retidos para cumprimento de obrigações legais.</p>

                    <h3>8. Alterações nos Termos</h3>
                    <p>Reservamo-nos o direito de alterar estes Termos e Condições a qualquer momento. Os usuários serão notificados sobre mudanças significativas e devem revisar periodicamente este documento.</p>

                    <h3>9. Contato</h3>
                    <p>Para exercer seus direitos de titular de dados ou obter esclarecimentos sobre a política de privacidade, entre em contato através do e-mail: <strong>[email de contato]</strong>.</p>

                    <h3>10. Disposições Gerais</h3>
                    <p>Este termo é regido pelas leis brasileiras. Em caso de disputa, fica eleito o foro da cidade de São Paulo-SP, com exclusão de qualquer outro, por mais privilegiado que seja.</p>

                </div>
                <div className="checkbox-container-termo">
                    <article className={`checkbox-container ${erroTermos ? 'erro' : ''}`}>
                        <label className="checkbox">
                            <input
                                id="check"
                                type="checkbox"
                                checked={aceitouTermos}
                                onChange={() => {
                                    setAceitouTermos(!aceitouTermos);
                                    setErroTermos(false); // Limpa o erro se o checkbox for marcado
                                }}
                            />
                        </label>
                        <label htmlFor="check">Eu li e aceito os Termos de Uso.</label>
                    </article>
                    {erroTermos && <p className="erro-texto">Você precisa aceitar os Termos de Uso.</p>}

                    <article className={`checkbox-container ${erroDados ? 'erro' : ''}`}>
                        <label className="checkbox">
                            <input
                                id="check"
                                type="checkbox"
                                checked={aceitouDados}
                                onChange={() => {
                                    setAceitouDados(!aceitouDados);
                                    setErroDados(false); // Limpa o erro se o checkbox for marcado
                                }}
                            />
                        </label>
                        <label htmlFor="check">Eu concordo com a Política de Privacidade e uso de dados.</label>
                    </article>
                    {erroDados && <p className="erro-texto">Você precisa concordar com a Política de Privacidade.</p>}
                </div>
                <div className="botoes-modal-termo">
                    <button onClick={onClose} className="cancelar-btn botao-entrar contato-servico">Cancelar</button>
                    <button onClick={handleConfirmar} className="confirmar-btn botao-entrar finalizar-servico">Confirmar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalTermo;
