import "../components/site.css";
import axios from "axios";
import React, { useState } from "react";

function Conteudo() {
  const apiKey = "89014fa1a1msh97a24338acfdb10p1032f3jsnf6584350e8e9";
  const autoCompleteEndpoint =
    "https://sky-scanner3.p.rapidapi.com/flights/auto-complete";

  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [resultadosAutoCompleteOrigem, setResultadosAutoCompleteOrigem] = useState([]);
  const [resultadosAutoCompleteDestino, setResultadosAutoCompleteDestino] = useState([]);
  const [itinerarios, setItinerarios] = useState([]);

  const fazerSolicitacaoAutoCompleteOrigem = async () => {
    try {
      const response = await axios.get(autoCompleteEndpoint, {
        params: { query: origem },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
        },
      });

      setResultadosAutoCompleteOrigem(response.data.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const fazerSolicitacaoAutoCompleteDestino = async () => {
    try {
      const response = await axios.get(autoCompleteEndpoint, {
        params: { query: destino },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
        },
      });

      setResultadosAutoCompleteDestino(response.data.data.slice(0, 5));
      console.log(resultadosAutoCompleteDestino)
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeOrigem = (event) => {
    setOrigem(event.target.value);
  };

  const handleChangeDestino = (event) => {
    setDestino(event.target.value);
  };

  const handleChangeDataPartida = (event) => {
    setDataPartida(event.target.value);
  };

  const pesquisarVoos = async () => {
    let origemId = null;
    let destinoId = null;

    for (let i = 0; i < resultadosAutoCompleteOrigem.length; i++) {
      if (resultadosAutoCompleteOrigem[i].presentation.title === origem) {
        origemId = resultadosAutoCompleteOrigem[i].presentation.id;
      }
    }

    for (let i = 0; i < resultadosAutoCompleteDestino.length; i++) {
      if (resultadosAutoCompleteDestino[i].presentation.title === destino) {
        destinoId = resultadosAutoCompleteDestino[i].presentation.id;
      }
    }

    if (origemId === null || destinoId === null || !dataPartida) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const options = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/flights/search-one-way",
      params: {
        fromEntityId: origemId,
        toEntityId: destinoId,
        departDate: dataPartida,
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const itineraries = response.data.data.itineraries; 

      if (itineraries.length === 0) {
        alert("Não há viagens nesse dia :(");
        return;
      }

      const filteredItineraries = [];
      const pricesSet = new Set();

      for (const itinerary of itineraries) {
        const priceFormatted = itinerary.price.formatted;
        if (!pricesSet.has(priceFormatted)) {
          pricesSet.add(priceFormatted);
          filteredItineraries.push(itinerary);
        }
        if (filteredItineraries.length === 10) break;
      }
      console.log(filteredItineraries)
      setItinerarios(filteredItineraries);

    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao buscar os itinerários. Por favor, tente novamente."
      );
    }
  };

  function trocarLocais() {
    const destinoTemp = destino;
    setDestino(origem);
    setOrigem(destinoTemp);

    const completeDestinoTemp = resultadosAutoCompleteDestino
    setResultadosAutoCompleteDestino(resultadosAutoCompleteOrigem)
    setResultadosAutoCompleteOrigem(completeDestinoTemp)
  }

  return (
    <>
      <div className="formViagem">
        <input type="text" name="origem" list="autoCompleteOrigem" placeholder="Origem" value={origem} autoComplete="off" 
        onChange={(e) => {   setOrigem(e.target.value); }} onBlur={fazerSolicitacaoAutoCompleteOrigem}
        />
        <datalist id="autoCompleteOrigem">
          {resultadosAutoCompleteOrigem.map((resultado, index) => (
            <option
              key={index}
              value={resultado.presentation.title}
              id={resultado.presentation.id}
            />
          ))}
        </datalist>

        <button onClick={trocarLocais}><img id="change" src='https://cdn-icons-png.freepik.com/512/50/50482.png'/></button>


        <input type="text" name="destino" list="autoCompleteDestino" placeholder="Destino" value={destino} autoComplete="off"
        onChange={(e) => {   setDestino(e.target.value); }} onBlur={fazerSolicitacaoAutoCompleteDestino}
        />
        <datalist id="autoCompleteDestino">
          {resultadosAutoCompleteDestino.map((resultado, index) => (
            <option key={index} value={resultado.presentation.title} />
          ))}
        </datalist>

        <input type="date" value={dataPartida} onChange={handleChangeDataPartida}/>

        <button id="Search" onClick={pesquisarVoos}>
          Search
        </button>
      </div>

        {itinerarios.map((itinerario) => (
        <div className="cardViagem">
            <img src={itinerario.legs[0].carriers.marketing[0].logoUrl} id="iconAirline"/>
            <h2>{itinerario.legs[0].carriers.marketing[0].name}</h2>
            <p id="info">-&nbsp;&nbsp;
            {new Date(itinerario.legs[0].departure).getHours()}h{new Date(itinerario.legs[0].departure).getMinutes()}m
            <img src='https://cdn-icons-png.flaticon.com/512/3125/3125713.png' id="iconAviao"/> 
            {new Date(itinerario.legs[0].arrival).getHours()}h{new Date(itinerario.legs[0].arrival).getMinutes()}m
            </p>
            <p id="preço">{itinerario.price.formatted}</p>
            <p id="duração">{Math.floor(itinerario.legs[0].durationInMinutes/60)}h {itinerario.legs[0].durationInMinutes%60}m</p>
        </div>
        ))}

    </>
  );
}

export default Conteudo;
