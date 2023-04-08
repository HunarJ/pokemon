import React, { useState, useEffect } from "react";
import "./App.css";
import { apiGet } from "./utils/api";
import Card from "./components/Card";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');

  const handleNavigation = async (url) => {
    if (!url) return;
    setLoading(true);
    const data = await apiGet(url);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPreviousUrl(data.previous);
    setLoading(false);
};

const handleNextClick = async () => {
    await handleNavigation(nextUrl);
};

const handlePreviousClick = async () => {
    await handleNavigation(previousUrl);
};


  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await apiGet(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  useEffect(() => {
    const fetchData = async () => {
        const response = await apiGet(initialURL);
        setLoading(false);
        setNextUrl(response.next);
        setPreviousUrl(response.previous);
        await loadPokemon(response.results);
    };

    fetchData();
}, []);

  return (
    <div>
    {loading ? (
        <h1>Stránka se načítá</h1>
    ) : (
        <div>
            <div className="btn">
                <button onClick={handlePreviousClick}>Previous</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
            <div className="grid-container">
                {pokemonData.map((pokemon) => {
                    return <Card key={pokemon.name} pokemon={pokemon} />;
                })}
            </div>
            <div className="btn">
                <button onClick={handlePreviousClick}>Previous</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    )}
</div>
  );
}

export default App;
