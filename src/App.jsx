import React from 'react';
import ReactDOM from 'react-dom/client'
import { Routes, Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';


import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Conteudo from './components/Conteudo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
        <App />
     </BrowserRouter>
  </React.StrictMode>,
)

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="cadastro" element={<Cadastro />} className="Cadastro"/>
        <Route path="login" element={<Login />} />
        <Route path="site" element={<Site />} />
      </Routes>
    </>
  )
}

function Home(){
  return(
    <div className="Home">
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}


function Site(){
  return(
    <div>
      <Header/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Conteudo/><br/><br/>
      <Footer/>
    </div>
  )
}

export default App