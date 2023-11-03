import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.css";

const PokemonCard = (props) => {
  const [pokemon, setPokemon] = useState(null);
  const [modal, setModal] = useState(false);
  const { name, url } = props;
  const getPokemon = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    setPokemon(responseJson);
  };
  useEffect(() => {
    getPokemon();
  }, []);
  const changeModal = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.container}>
      {pokemon === null ? (
        <p>Cargando {name} ...</p>
      ) : (
        <>
          <h3>{`ID: ${pokemon.id}`}</h3>
          <h2>{pokemon.name}</h2>
          <img
            className={styles.imagen}
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <button onClick={changeModal}> Ver Detalles</button>
        </>
      )}

      {modal && (
        <div className={styles.modal}>
          <div className={styles.containerModal}>
            <button onClick={changeModal}>X</button>
            <p>{pokemon.name}</p>
            <div className={styles.list}>
              {pokemon.abilities.map((ability) => {
                return <p>{ability.ability.name}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
