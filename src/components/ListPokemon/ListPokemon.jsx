import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./ListPokemon.module.css";

const ListPokemon = () => {
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [pageActual, setPageActual] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [listaPokemon, setListaPokemon] = useState([]);
  const llamarLista = async () => {
    const response = await fetch(pageActual);
    const responseJson = await response.json();
    setListaPokemon(responseJson.results);
    setNext(responseJson.next);
    setPrevious(responseJson.previous);
  };
  useEffect(() => {
    llamarLista();
  }, [pageActual]);

  const llamarSiguiente = () => {
    setPageActual(next);
  };
  const llamarAnterior = () => {
    setPageActual(previous);
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Pokemon </h1>

      {previous && <button onClick={llamarAnterior}>Anterior</button>}
      {next && <button onClick={llamarSiguiente}>Siguiente</button>}

      <div className={styles.list}>
        {listaPokemon.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListPokemon;
