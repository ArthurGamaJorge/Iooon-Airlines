import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/cadastro.css"

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
            localStorage.setItem('logado', nome)
            window.location.href = "/site";
        } else {
            setError('Nome de usuário ou senha inválidos');
        }
    }

    return (
        <div className="Cadastro">
            <form onSubmit={handleSubmit} id="formulario">
                <fieldset style={{ height: '350px' }}>
                    <legend>Login</legend> <br />
                    <label>Nome: </label> <br />
                    <input type="text" name="Nome" id="nome" value={nome} onChange={e => setNome(e.target.value)} required /> <br /><br />

                    <label>Senha: </label> <br />
                    <input type="password" name="Senha" id="Senha" value={senha} onChange={e => setSenha(e.target.value)} required /> <br /><br />

                    <button type="submit" id="Entrar">Entrar</button> <br /><br />
                    {error && <p id="error">{error}</p>} <br />

                    <Link to="../">Home Page</Link>
                </fieldset> <br /><br />
            </form>
        </div>
    );
}

export default Login;
