import React, {useState} from "react";
import './Cadastro.scss';
import Containerform from '../../assets/componentes/Containerform.jsx'

function Cadastro() {
    return (
        <>
            <Containerform>
                <h1>Cadastro</h1>

                <div class="tipo-cadastro">
                    <button id="btnPedreiro" onclick="setUserType('pedreiro')" class="botao-entrar">Cadastrar como
                        Pedreiro</button>
                    <button id="btnContratante" onclick="setUserType('contratante')" class="botao-entrar">Cadastrar como
                        Contratante</button>
                </div>

                {/* <form id="registrationForm" method="POST" action="/register/pedreiro">
                    <div id="cadastroInicio" class="avancar-cadastro-pedreiro">
                        <InputControl>
                            <input type="hidden" name="tipo" value="pedreiro" />
                            <label for="nome" class="text">Nome:</label>
                            <input type="text" name="nome" required class="input" />
                        </InputControl>

                        <InputControl>
                            <label for="telefone" class="text">Telefone:</label>
                            <input type="text" name="telefone" class="input" />
                        </InputControl>

                        <InputControl>
                            <label for="cpf" class="text">CPF:</label>
                            <input type="text" name="cpf" required class="input" />
                        </InputControl>

                        <InputControl>
                            <label for="email" class="text">Email:</label>
                            <input type="text" name="email" required class="input" />
                        </InputControl>

                        <InputControl>
                            <label for="senha" class="text">Senha:</label>
                            <input type="password" name="senha" required class="input" />
                        </InputControl>

                        <InputControl>
                            <label for="cep" class="text">CEP:</label>
                            <input type="text" name="cep" required class="input" />
                        </InputControl>

                    </div>
                </form> */}
            </Containerform>

        </>
    )
}

export default Cadastro;