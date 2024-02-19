import "../components/site.css"

function Conteudo(){
    return(
        <>
            <div id="Alta">
            <h1 id="Titulo">EM ALTA</h1>

            <div className="ContainerGeral">

                <div className="Card">
                    <div className="Imagem" id="Imagem1"></div>
                    <h1>Rio de Janeiro</h1> <br/>
                    <p>Preço São Paulo - Rio: R$300</p>
                </div>

                <div className="Card">
                    <div className="Imagem" id="Imagem2"></div>
                    <h1>Fortaleza</h1> <br/>
                    <p>Preço São Paulo - Fortaleza: R$1100</p>
                </div>

                <div className="Card">
                    <div className="Imagem" id="Imagem3"></div>
                    <h1>Brasilia</h1> <br/>
                    <p>Preço São Paulo - Brasilia: R$400</p>
                </div>

                <div className="Card">
                    <div className="Imagem" id="Imagem4"></div>
                    <h1>Manaus</h1> <br/>
                    <p>Preço São Paulo - Manaus: R$1300</p>
                </div>

                <div className="Card">
                    <div className="Imagem" id="Imagem5"></div>
                    <h1>Bahia</h1> <br/>
                    <p>Preço São Paulo - Bahia: R$800</p>
                </div>
            </div>

            <br/><br/><br/>
            </div>

            <br/><br/><br/><br/><br/>

            <div id="Barato">
                <h1 id="Titulo">MAIS BARATO</h1>

                <div className="ContainerGeral">

                    <div className="Card">
                        <div className="Imagem" id="Imagem6"></div>
                        <h1>Porto seguro</h1> <br/>
                        <p>Preço São Paulo - Bahia: R$270</p>
                    </div>

                    <div className="Card">
                        <div className="Imagem" id="Imagem7"></div>
                        <h1>Arraial do Cabo</h1> <br/>
                        <p>Preço São Paulo - Rio: R$150</p>
                    </div>

                    <div className="Card">
                        <div className="Imagem" id="Imagem8"></div>
                        <h1>Sana</h1> <br/>
                        <p>Preço São Paulo - Rio: R$150</p>
                    </div>

                    <div className="Card">
                        <div className="Imagem" id="Imagem9"></div>
                        <h1>Ouro Preto</h1> <br/>
                        <p>Preço São Paulo - Minas Gerais: R$200</p>
                    </div>

                </div> <br/><br/><br/>
            </div>
                <br/><br/><br/><br/>
        </>
    )
}

export default Conteudo