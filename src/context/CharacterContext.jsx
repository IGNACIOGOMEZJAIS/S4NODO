import { createContext, useContext, useState } from "react";
import { fetchCharacter } from "../services/characterAPI";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rickAndMortyFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [expandedId, setExpandedId] = useState(null);
  const [characterCount, setCharacterCount] = useState(20);
  const [apiError, setApiError] = useState(null);

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some(fav => fav.id === character.id);
    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav.id !== character.id)
      : [...favorites, character];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('rickAndMortyFavorites', JSON.stringify(updatedFavorites));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  

  const getCharacter = async (name, count = characterCount) => {
    setLoading(true);
    setApiError(null);
    setCharacterData([]);

    try {
      const data = await fetchCharacter(name, count);
      setCharacterData(data);
    } catch (error) {
      setApiError({
        status: error.status,
        message: error.message,
        searchTerm: name
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CharacterContext.Provider value={{
      characterData,
      loading,
      favorites,
      expandedId,
      characterCount,
      apiError,
      getCharacter,
      toggleFavorite,
      toggleExpand,
      setCharacterCount,
      name,
      setName,
    
    }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);