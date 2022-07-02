import React, { useState } from "react";
import Regiao from "../Regiao";
import upArrow from "../assets/up-arrow.png"
import downArrow from "../assets/down-arrow.png"
import "./index.css";

function mostraConteudo() {

}

export default function Pesquisa({ setPesquisa , fetchPokemons }) {

  const [avancada, setAvancada] = useState(false)
  const [infoPack, setInfoPack] = useState([])

  return (
    <>
      <div className="pesquisa">

        <div className="pesquisa-container">
          <input
            variant="standart"
            placeholder="Pesquise aqui por nome!"
            className="pesquisa-container-field"
            onChange={(event) => setPesquisa(event.target.value)}
          />
          <input
            type="button"
            value="Pesquisar!"
            onClick={() => {
              fetchPokemons()
            }}
            className="pesquisa-container-buttom"
          />
        </div>

        <div className="pesquisa-avancada">

          <label className="pesquisa-avancada-label">Avançada</label>

          <section className={`pesquisa-avancada-content ${avancada ? 'pesquisa-avancada-open' : 'pesquisa-avancada-closed'}`}>
            <Regiao setSelectValue={setInfoPack} />
          </section>

          <img className={`pesquisa-avancada-arrow`} onClick={() => setAvancada(!avancada)} src={avancada? upArrow : downArrow}/>

        </div>

      </div>
    </>
  );
}
