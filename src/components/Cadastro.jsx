import "../components/cadastro.css"

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Cadastro(){
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
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        listaUser.push({
            nomeCad: nome,
            emailCad: email,
            dataCad: data,
            senhaCad: senha
        });

        localStorage.setItem('listaUser', JSON.stringify(listaUser));

        window.location.href = "/login";
    }

    return (
        <div className="Cadastro">
            <form onSubmit={handleSubmit} id="formulario">
                <fieldset>
                    <legend>Cadastro</legend> <br/>
                    <label>Nome: </label> <br/>
                    <input type="text" name="Nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required /> <br /><br />

                    <label>E-mail: </label> <br/>
                    <input type="email" name="Email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> <br/><br/>

                    <label>Data nascimento: </label> <br/>
                    <input type="date" name="Data" id="Data" value={data} onChange={(e) => setData(e.target.value)} required/> <br/><br/>

                    <label>Senha: </label> <br/>
                    <input type="password" name="Senha" id="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/> <br/><br/>

                    <input type="submit" value="Enviar"/>
                    <input type="reset" value="Apagar"/> <br/><br/><br/>
                    
                    <Link to = "../"> <a>Home Page</a> </Link>

                </fieldset> <br/>
            </form>
        </div>
    )
}

export default Cadastro;
