import React, {useState} from "react";
import './Cadastro.scss';
import Containerform from '../../assets/componentes/Containerform.jsx';
import FormCadastro from '../../assets/componentes/FormCadastro.jsx';

function Cadastro() {

    const [formType, setFormType] = useState(null);

    return (
        <>
            <Containerform>
                <h1>Cadastro</h1>

                <div class="tipo-cadastro">
                    <button id="btnPedreiro" onClick={() => setFormType('form1')} class="botao-entrar">Cadastrar como
                        Pedreiro</button>
                    <button id="btnContratante" onClick={() => setFormType('form2')} class="botao-entrar">Cadastrar como
                        Contratante</button>
                </div>

                {formType === 'form1' && <FormCadastro />}

            </Containerform>

        </>
    )
}

export default Cadastro;