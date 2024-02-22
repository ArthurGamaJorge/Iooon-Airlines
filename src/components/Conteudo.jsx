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
  const [resultadosAutoCompleteOrigem, setResultadosAutoCompleteOrigem] =
    useState([]);
  const [resultadosAutoCompleteDestino, setResultadosAutoCompleteDestino] =
    useState([]);
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

      setResultadosAutoCompleteOrigem(response.data.data.slice(0, 5)); // Assumindo que data é um array de objetos
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

      setResultadosAutoCompleteDestino(response.data.data.slice(0, 5)); // Assumindo que data é um array de objetos
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

    for (var i = 0; i < resultadosAutoCompleteOrigem.length; i++) {
      if (resultadosAutoCompleteOrigem[i].presentation.title === origem) {
        origemId = resultadosAutoCompleteOrigem[i].presentation.id;
      }
    }

    for (var i = 0; i < resultadosAutoCompleteDestino.length; i++) {
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
      const itineraries = response.data.data; // Verifique a estrutura da resposta e ajuste conforme necessário
      console.log(itineraries);
      setItinerarios(itineraries);

      if (itineraries.length === 0) {
        alert("Não há viagens nesse dia :(");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao buscar os itinerários. Por favor, tente novamente."
      );
    }
  };

  return (
    <>
      <div className="formViagem">
        <input type="text" name="origem" list="autoCompleteOrigem" placeholder="Origem" value={origem} onChange={(e) => {   setOrigem(e.target.value); }} onBlur={fazerSolicitacaoAutoCompleteOrigem}
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

        <input type="text" name="destino" list="autoCompleteDestino" placeholder="Destino" value={destino} onChange={(e) => {   setDestino(e.target.value); }} onBlur={fazerSolicitacaoAutoCompleteDestino}
        />
        <datalist id="autoCompleteDestino">
          {resultadosAutoCompleteDestino.map((resultado, index) => (
            <option key={index} value={resultado.presentation.title} />
          ))}
        </datalist>

        <input
          type="date"
          value={dataPartida}
          onChange={handleChangeDataPartida}
        />

        <button id="Search" onClick={pesquisarVoos}>
          Search
        </button>
      </div>
      <br/><br/><br/>

      <div className="itinerarios">
  {itinerarios.itineraries && itinerarios.itineraries.reduce((acc, itinerario, index) => {
    if (acc.count >= 10) return acc;

    const isDifferentPrice = index === 0 || itinerario.price.formatted !== itinerarios.itineraries[index - 1].price.formatted;

    if (isDifferentPrice) {
      acc.count++;
      acc.elements.push(
        <div key={index} className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/3125/3125713.png" id="iconAviao"/>
          <h2>Itinerário - {origem} : {destino}</h2>
          <p id="preço">{itinerario.price.formatted}</p>
        </div>
      );
    }

    return acc;
  }, { count: 0, elements: [] }).elements}
</div>

    </>
  );
}

export default Conteudo;
