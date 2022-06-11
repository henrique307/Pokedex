import React from "react";
import arrow from "../assets/arrow.png"
import "./index.css";

export default function Pesquisa({ setPesquisa, pegaPokemons }) {
  return (
    <>
      <div className="pesquisa">
        <div className="pesquisa-container">
          <input
            variant="standart"
            placeholder="Barra de pesquisa"
            className="pesquisa-container-field"
            onChange={(event) => setPesquisa(event.target.value)}
          />
          <input
            type="button"
            value="Pesquisar!"
            onClick={pegaPokemons}
            className="pesquisa-container-buttom"
          />
        </div>
        <div className="pesquisa-avancada" onClick={() => {console.log("foi clicado")}}>
            <label className="pesquisa-avancada-label">Avançada</label>
            <img className={`pesquisa-avancada-arrow`} src={arrow}/>
        </div>
      </div>
    </>
  );
}
