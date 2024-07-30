import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/cadastro.css";

function Login() {
    const [darkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(darkTheme));
    }, [darkTheme]);

    useEffect(() => {
        if (darkTheme) {
            document.body.classList.add('Dark-theme');
        } else {
            document.body.classList.remove('Dark-theme');
        }
    }, [darkTheme]);

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

        const usuarioValido = listaUser.find(item => nome === item.nomeCad && senha === item.senhaCad);

        if (usuarioValido) {
            localStorage.setItem('logado', nome);
            window.location.href = "/site";
        } else {
            setError('Nome de usuário ou senha inválidos');
        }
    }

    return (
        <>
        <a href="../" className="voltar">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 26 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
            </svg>
        </a>
        <div className="Cadastro">
            <form onSubmit={handleSubmit} id="formulario">
                <fieldset>
                    <legend>Login</legend> <br />
                    <div className="divDados">
                        <label>Nome: </label>
                        <input type="text" name="Nome" id="nome" value={nome} onChange={e => setNome(e.target.value)} required /> <br/><br/>

                        <label>Senha: </label>
                        <input type="password" name="Senha" id="Senha" value={senha} onChange={e => setSenha(e.target.value)} required /> 
                        {error ? <p id="error">{error}</p> : <br/>} <br/>
                        
                        <div className="botõesForm">
                            <input type="submit" value="Entrar" />
                        </div> 

                        <Link to="../">Home Page</Link>
                    </div>
                </fieldset> <br /><br />
            </form>
        </div>
        </>
    );
}

export default Login;