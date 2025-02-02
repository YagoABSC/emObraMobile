import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './Cadastro.scss';
import Containerform from '../../assets/componentes/Containerform.jsx';
import FormCadastro from '../../assets/componentes/FormCadastro.jsx';

function Cadastro() {

    const [formType, setFormType] = useState(null);

    return (
        <>
            <Containerform>
                <h1>Criar conta</h1>

                <FormCadastro />

                <Link to="/login" className="outras-acoes-login">Já tenho conta</Link>

            </Containerform>

        </>
    )
}

export default Cadastro;