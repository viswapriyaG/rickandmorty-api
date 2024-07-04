// components/CharacterList.js
import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../services/rickAndMortyService';
import './CharacterList.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const getCharacters = async () => {
            const data = await fetchCharacters(page);
            setCharacters(data.results);
            setInfo(data.info);
        };
        getCharacters();
    }, [page]);

    const handleNextPage = () => {
        if (info.next) {
            setPage(prevPage => prevPage + 1);
        } 
    };

    const handlePreviousPage = () => {
        if (info.prev) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="character-list-container">
            <div className="character-list">
                {characters.map(character => (
                    <div key={character.id} className="character-card">
                        <img src={character.image} alt={character.name} />
                        <div className="character-details">
                            <h3>{character.name}</h3>
                            <p>Status: {character.status}</p>
                            <p>Species: {character.species}</p>
                            <p>Location: {character.location.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={!info.prev}>Previous</button>
                <button onClick={handleNextPage} disabled={!info.next || page === 5}>Next</button>
            </div>
        </div>
    );
};

export default CharacterList;