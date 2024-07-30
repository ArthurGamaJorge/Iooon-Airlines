import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cadastro.css';

function Cadastro() {
    const [darkTheme, setDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(darkTheme));
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
        localStorage.setItem('logado', nome);

        window.location.href = "/site";
    }

    function handleReset() {
        setNome('');
        setEmail('');
        setData('');
        setSenha('');
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
                        <legend>Cadastro</legend> <br/>
                        <div className="divDados">
                            <label>Nome: </label> 
                            <input type="text" name="Nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                            <br/><br/>

                            <label>E-mail: </label>
                            <input type="email" name="Email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/> 
                            <br/><br/>

                            <label>Data nascimento: </label>
                            <input type="date" name="Data" id="Data" value={data} onChange={(e) => setData(e.target.value)} required/> 
                            <br/><br/>

                            <label>Senha: </label> 
                            <input type="password" name="Senha" id="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/> 
                            <br/><br/>

                            <div className='botõesForm'>
                                <input type="submit" value="Enviar"/>
                                <input type="reset" value="Apagar" onClick={handleReset}/> 
                            </div>
                            
                            <Link to="/">Home Page</Link>
                        </div>
                    </fieldset> <br/>
                </form>
            </div>
        </>
    );
}

export default Cadastro;
