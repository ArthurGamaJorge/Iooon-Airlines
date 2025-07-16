import React, { useState, useEffect, useRef } from "react";
import airports from "../assets/airports.json";
import "../components/site.css";
import axios from "axios";

function Flag({ countryCode }) {
  if (!countryCode) return null;
  const code = countryCode.toLowerCase();
  const url = `https://flagcdn.com/w20/${code}.png`;
  return (
    <img
      src={url}
      alt={`Bandeira ${countryCode}`}
      style={{
        width: 20,
        height: 15,
        marginRight: 8,
        objectFit: "cover",
        borderRadius: 2,
      }}
      loading="lazy"
    />
  );
}

function Conteudo() {
  const apiKey =
    "c73e7f0dad498b485c9479c6705c7e3b99c35f227d259e78bb74f7bcc9124095";

  const [origemDropdownAberto, setOrigemDropdownAberto] = useState(false);
  const [destinoDropdownAberto, setDestinoDropdownAberto] = useState(false);
  const origemRef = useRef(null);
  const destinoRef = useRef(null);

  const [origemInput, setOrigemInput] = useState("");
  const [destinoInput, setDestinoInput] = useState("");
  const [dataPartida, setDataPartida] = useState("");
  const [origemSelecionado, setOrigemSelecionado] = useState(null);
  const [destinoSelecionado, setDestinoSelecionado] = useState(null);
  const [itinerarios, setItinerarios] = useState([]);

  function textoComecaCom(texto, termo) {
    if (!texto || !termo) return false;
    texto = texto.toLowerCase();
    termo = termo.toLowerCase();

    return texto.startsWith(termo);
  }

  const filtrarAeroportos = (termo) => {
    if (!termo) return [];
    const lowerTermo = termo.toLowerCase();

    // Primeiro filtra por cidade que começa com o termo completo
    const porCidade = airports.filter((airport) =>
      textoComecaCom(airport.city, lowerTermo)
    );

    // Depois por nome ou país que começa com o termo e não está na lista de cidade
    const porNomeOuPais = airports.filter(
      (airport) =>
        (textoComecaCom(airport.name, lowerTermo) ||
          textoComecaCom(airport.country, lowerTermo)) &&
        !porCidade.includes(airport)
    );

    return [...porCidade, ...porNomeOuPais].slice(0, 10);
  };

  const resultadosAutoCompleteOrigem = filtrarAeroportos(origemInput);
  const resultadosAutoCompleteDestino = filtrarAeroportos(destinoInput);

  const handleOrigemChange = (e) => {
    setOrigemInput(e.target.value);
    setOrigemSelecionado(null);
    setOrigemDropdownAberto(true);
  };

  const handleDestinoChange = (e) => {
    setDestinoInput(e.target.value);
    setDestinoSelecionado(null);
    setDestinoDropdownAberto(true);
  };

  // Quando selecionar um item fecha o dropdown
  const handleSelecionarOrigem = (airport) => {
    setOrigemSelecionado(airport);
    setOrigemInput(`${airport.city} - ${airport.name}`);
    setOrigemDropdownAberto(false);
  };

  const handleSelecionarDestino = (airport) => {
    setDestinoSelecionado(airport);
    setDestinoInput(`${airport.city} - ${airport.name}`);
    setDestinoDropdownAberto(false);
  };

  const pesquisarVoos = async () => {
  if (!origemSelecionado || !destinoSelecionado || !dataPartida) {
    alert("Por favor, selecione origem, destino e data corretamente.");
    return;
  }

  try {
    const response = await axios.get('https://iooon-airlines-backend.vercel.app/api/flights', {
      params: {
        departure_id: origemSelecionado.code,
        arrival_id: destinoSelecionado.code,
        outbound_date: dataPartida,
      },
    });

    const data = response.data;
    // Use o data conforme a estrutura SerpApi (ex: data.best_flights)

    if (!data.best_flights || data.best_flights.length === 0) {
      alert("Não há viagens nesse dia");
      setItinerarios([]);
      return;
    }

    setItinerarios(data.best_flights.slice(0, 10));
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar voos. Tente novamente.");
  }
};

  function trocarLocais() {
    setOrigemInput(destinoInput);
    setDestinoInput(origemInput);
    setOrigemSelecionado(destinoSelecionado);
    setDestinoSelecionado(origemSelecionado);
  }

  useEffect(() => {
    function handleClickFora(event) {
      // Fecha dropdown origem se clicou fora do container origem
      if (origemRef.current && !origemRef.current.contains(event.target)) {
        setOrigemDropdownAberto(false);
      }
      // Fecha dropdown destino se clicou fora do container destino
      if (destinoRef.current && !destinoRef.current.contains(event.target)) {
        setDestinoDropdownAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <>
      <div className="formViagem">
        <h1>Procure informações sobre voos entre duas cidades</h1>
        <br />

        <div className="locais">
          {/* Input Origem com bandeira no começo */}
          <div className="input-with-flag-grid" ref={origemRef}>
            <div className="input-flag-placeholder">
              {origemSelecionado ? (
                <img
                  src={`https://flagcdn.com/w20/${origemSelecionado.country.toLowerCase()}.png`}
                  alt={`Bandeira ${origemSelecionado.country}`}
                  className="input-flag-grid"
                  loading="lazy"
                />
              ) : (
                // espaço vazio, mas mantém tamanho reservado
                <div className="input-flag-empty"></div>
              )}
            </div>
            <input
              type="text"
              placeholder="Origem"
              value={origemInput}
              onChange={handleOrigemChange}
              onFocus={() => setOrigemDropdownAberto(true)}
              autoComplete="off"
              className="input-voo-grid"
            />
            {origemDropdownAberto && origemInput && !origemSelecionado && (
              <ul className="autocomplete-list">
                {resultadosAutoCompleteOrigem.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleSelecionarOrigem(airport)}
                    className="autocomplete-item"
                  >
                    <Flag countryCode={airport.country} />
                    <span>
                      <strong>{airport.city}</strong> - {airport.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botão trocar com a imagem antiga */}
          <button
            onClick={trocarLocais}
            className="trocar-btn"
            id="change"
            title="Trocar origem e destino"
            type="button"
          >
            <img
              src="https://cdn-icons-png.freepik.com/512/50/50482.png"
              alt="Trocar"
              className="icon-trocar"
              loading="lazy"
            />
          </button>

          <div className="input-with-flag-grid" ref={destinoRef}>
            <div className="input-flag-placeholder">
              {destinoSelecionado ? (
                <img
                  src={`https://flagcdn.com/w20/${destinoSelecionado.country.toLowerCase()}.png`}
                  alt={`Bandeira ${destinoSelecionado.country}`}
                  className="input-flag-grid"
                  loading="lazy"
                />
              ) : (
                <div className="input-flag-empty"></div>
              )}
            </div>
            <input
              type="text"
              placeholder="Destino"
              value={destinoInput}
              onChange={handleDestinoChange}
              onFocus={() => setDestinoDropdownAberto(true)}
              autoComplete="off"
              className="input-voo-grid"
            />
            {destinoDropdownAberto && destinoInput && !destinoSelecionado && (
              <ul className="autocomplete-list">
                {resultadosAutoCompleteDestino.map((airport) => (
                  <li
                    key={airport.code}
                    onClick={() => handleSelecionarDestino(airport)}
                    className="autocomplete-item"
                  >
                    <Flag countryCode={airport.country} />
                    <strong>{airport.city}</strong> - {airport.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input id="inputData"
            type="date"
            value={dataPartida}
            onChange={(e) => setDataPartida(e.target.value)}
          />
        </div>

        <button id="Search" onClick={pesquisarVoos}>
          Procurar
        </button>
      </div>

      <div className="resultados">
        {itinerarios.map((itinerario, idx) => {
          const voo = itinerario.flights[0]; // primeiro trecho
          const departureTime = new Date(voo.departure_airport.time);
          const arrivalTime = new Date(voo.arrival_airport.time);

          return (
            <div className="cardViagem" key={idx}>
              <img
                src={itinerario.airline_logo}
                alt={voo.airline}
                id="iconAirline"
                loading="lazy"
              />
              <h2>{voo.airline}</h2>

              <p id="info">
                - &nbsp;&nbsp;
                {departureTime.getHours()}h
                {String(departureTime.getMinutes()).padStart(2, "0")}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3125/3125713.png"
                  alt="Ícone avião"
                  id="iconAviao"
                />
                {arrivalTime.getHours()}h
                {String(arrivalTime.getMinutes()).padStart(2, "0")}
              </p>

              <p id="preço">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(itinerario.price)}
              </p>

              <p id="duração">
                {Math.floor(itinerario.total_duration / 60)}h{" "}
                {itinerario.total_duration % 60}m
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Conteudo;
