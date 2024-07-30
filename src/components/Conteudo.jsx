import "../components/site.css";
import axios from "axios";
import React, { useState } from "react";

function Conteudo() {
  const apiKey = "89014fa1a1msh97a24338acfdb10p1032f3jsnf6584350e8e9";
  const autoCompleteEndpoint = "https://sky-scanner3.p.rapidapi.com/flights/auto-complete";

  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [resultadosAutoCompleteOrigem, setResultadosAutoCompleteOrigem] = useState([]);
  const [resultadosAutoCompleteDestino, setResultadosAutoCompleteDestino] = useState([]);
  const [itinerarios, setItinerarios] = useState([]);

  const getCachedData = () => {
    const cachedData = localStorage.getItem('cityCache');
    return cachedData ? JSON.parse(cachedData) : {};
  };

  const setCachedData = (data) => {
    localStorage.setItem('cityCache', JSON.stringify(data));
  };

  const getSearchTermCache = () => {
    const searchTermCache = localStorage.getItem('searchTermCache');
    return searchTermCache ? JSON.parse(searchTermCache) : {};
  };

  const setSearchTermCache = (data) => {
    localStorage.setItem('searchTermCache', JSON.stringify(data));
  };

  const fazerSolicitacaoAutoComplete = async (query, isOrigem) => {
    try {
      const searchTermCache = getSearchTermCache();

      // Check if exact match is in cache
      if (searchTermCache[query]) {
        if (isOrigem) {
          setResultadosAutoCompleteOrigem(searchTermCache[query]);
        } else {
          setResultadosAutoCompleteDestino(searchTermCache[query]);
        }
        return;
      }

      // If not cached, make API request
      const response = await axios.get(autoCompleteEndpoint, {
        params: { query: query },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
        },
      });

      const cachedData = getCachedData();
      const newResults = response.data.data;

      newResults.forEach(result => {
        if (!cachedData[result.presentation.id]) {
          cachedData[result.presentation.id] = result.presentation.title;
        }
      });

      setCachedData(cachedData);

      // Cache search term
      searchTermCache[query] = newResults;
      setSearchTermCache(searchTermCache);

      if (isOrigem) {
        setResultadosAutoCompleteOrigem(newResults);
      } else {
        setResultadosAutoCompleteDestino(newResults);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeOrigem = (event) => {
    setOrigem(event.target.value);
    fazerSolicitacaoAutoComplete(event.target.value, true);
  };

  const handleChangeDestino = (event) => {
    setDestino(event.target.value);
    fazerSolicitacaoAutoComplete(event.target.value, false);
  };

  const handleChangeDataPartida = (event) => {
    setDataPartida(event.target.value);
  };

  const pesquisarVoos = async () => {

    if (!origem || !destino || !dataPartida) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const cachedData = getCachedData();

    let origemId = Object.keys(cachedData).find(id => cachedData[id] === origem);
    let destinoId = Object.keys(cachedData).find(id => cachedData[id] === destino);

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
      console.log(response)
      const itineraries = response.data.data.itineraries;

      console.log(itineraries)
      if(itineraries == undefined){
        alert("Selecione uma cidade específica do país")
        return
      }
      if (itineraries.length === 0) {
        alert("Não há viagens nesse dia");
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
      setItinerarios(filteredItineraries);

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao buscar os itinerários. Por favor, tente novamente.");
    }
  };

  function trocarLocais() {
    const destinoTemp = destino;
    setDestino(origem);
    setOrigem(destinoTemp);

    const completeDestinoTemp = resultadosAutoCompleteDestino;
    setResultadosAutoCompleteDestino(resultadosAutoCompleteOrigem);
    setResultadosAutoCompleteOrigem(completeDestinoTemp);
  }

  return (
    <>
      <div className="formViagem">
        <h1>Procure informações sobre voos entre duas cidades</h1> <br/>
        
        <div className="locais">
          <input type="text" name="origem" list="autoCompleteOrigem" placeholder="Origem" value={origem} autoComplete="off" 
          onChange={handleChangeOrigem}
          />
          <datalist id="autoCompleteOrigem">
            {resultadosAutoCompleteOrigem.map((resultado, index) => (
              <option key={'auto' + index} value={resultado.presentation.title} id={resultado.presentation.id}/>
            ))}
          </datalist>

          <button onClick={trocarLocais}><img id="change" src='https://cdn-icons-png.freepik.com/512/50/50482.png'/></button>

          <input type="text" name="destino" list="autoCompleteDestino" placeholder="Destino" value={destino} autoComplete="off"
          onChange={handleChangeDestino}
          />
          <datalist id="autoCompleteDestino">
            {resultadosAutoCompleteDestino.map((resultado, index) => (
              <option key={index} value={resultado.presentation.title} />
            ))}
          </datalist>

          <button id="na"><svg id="change" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg></button>

          <input type="date" value={dataPartida} onChange={handleChangeDataPartida}/>

        
        </div>

        <button id="Search" onClick={pesquisarVoos}>
          Procurar
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
