import React, { useState, useEffect } from 'react';

import Logo from '../assets/IOOON logo.png'
import Menu from '../assets/Menu.png'
import Dark from '../assets/Dark theme.png'
import Light from '../assets/Light theme.png'
import Logout from '../assets/sair.png'

import { Link } from 'react-router-dom';

import "../components/Inicial.css"


function Header(){

    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto
    function toggleMenu() {
        setMenuOpen(!menuOpen); 
    }

    const [darkTheme, setDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });
    function toggleTheme() {
        setDarkTheme(!darkTheme); 
        document.body.classList.toggle('Dark-theme')
    }
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

    const [logado, setLogado] = useState(() => {
        const nomeUsuario = localStorage.getItem('logado');
        return nomeUsuario ? nomeUsuario : '';
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(darkTheme));
    }, [darkTheme]);

    return(
        <>
            <header>
                <Link to = '../' ><a href="#" className="Principal"> <img src={Logo} id="icone"/> Home</a></Link>
                <ul className={menuOpen? 'lista open': 'lista'}>
                    {logado == '' ? <>
                        <li> <Link to = "/cadastro"><a id="aHover"> Cadastro</a> </Link> </li>
                        <li> <Link to = "/login"><a id="aHover"> Login</a> </Link> </li> 
                    </> : <li><Link to = "/site"><a id="aHover"> Site</a> </Link></li>}
                    <li> <a> <button onClick={()=>{toggleTheme()}}> <img src={darkTheme? Dark:Light} id="tema"/> </button></a></li>
                </ul>

                <div className={menuOpen? 'Bx bx-menu bx-x': 'Bx bx-menu'} id="IconeMenu" onClick={()=>{toggleMenu()}}>
                    <img src={Menu} id="IconeMenu"/>
                </div>
            </header>
            {logado != '' ? <button id="logout" onClick={()=>{localStorage.setItem('logado', ''); setLogado(false)}}><img src={Logout}/></button> : null}
        </>
    )
}

export default Header