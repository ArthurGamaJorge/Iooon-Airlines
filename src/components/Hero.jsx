import Airplane from '../assets/Airplane.png'
import Seta from '../assets/Seta.png'

function Hero(){
    return(
        <>
            <section className="Main">

                <div>
                    <span> <h1 id="IOOON">IOOON</h1><h1 id="Airlines">Airlines</h1> </span>
                    <p>A IOOON Airlines - A forma mais rápida e segura de ir a qualquer lugar! Cadastre-se e embarque para a melhor experiência da sua vida com a IOOON Airlines</p>
                </div>

                <img src={Airplane} id="ImagemCentral"/>

                <img src={Seta} id="seta"/>


            </section>

            <section id="Noticias">
                <br/>
                <h1 id="titulo">Últimas notícias</h1>
                <div className="ContainerGeral">

                    <div className="card">
                        <div className="Imagem" id="Imagem1">
                            <p>Temporada de verão inicia e promoção especial de 20% a qualquer passagem chega</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="Imagem" id="Imagem2">
                            <p>Forte tempestade chega em São Paulo - voos adiantados em 4 horas</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="Imagem" id="Imagem3">
                            <p>Conheça melhor Rio de Janeiro, o estado com maior número de destinos </p>
                        </div>
                    </div>

                </div> <br/><br/>
            </section> <br/><br/><br/><br/><br/>
    </>
    )
}

export default Hero