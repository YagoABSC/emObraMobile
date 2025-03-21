import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import Cadastro from './pages/Cadastro/Cadastro.jsx'
import Perfil from './pages/Perfil/Perfil.jsx'
import RedefinirSenha from './pages/RedefinirSenha/RedefinirSenha.jsx'
import EditarPerfil from './pages/EditarPerfil/EditarPerfil.jsx'
import ExcluirConta from './pages/ExcluirConta/ExcluirConta.jsx'
import Servicos from './assets/componentes/Servicos.jsx'
import TrocarSenha from './pages/TrocarSenha/TrocarSenha.jsx'
import Termos from './pages/Termos/Termos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='login' element={<Login />}/>
        <Route path='cadastro' element={<Cadastro />}/>
        <Route path='perfil' element={<Perfil />}/>
        <Route path='redefinir-senha' element={<RedefinirSenha />}/>
        <Route path='editar-perfil' element={<EditarPerfil />}/>
        <Route path='excluir-conta' element={<ExcluirConta />}/>
        <Route path='pedreiro-servicos' element={<Servicos />} />
        <Route path='editar-senha' element={<TrocarSenha/>} />
        <Route path='termos' element={<Termos />} />
      </Routes>
    </Router>
  </StrictMode>,
)
