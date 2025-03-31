import { useCharacter } from "../context/CharacterContext";

const FavoritesList = () => {
  const { favorites, toggleFavorite } = useCharacter();

  if (favorites.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">No hay personajes favoritos aún.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Tus Personajes Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((character) => (
          <div key={character.id} className="bg-white p-4 rounded-lg shadow flex items-center">
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-bold">{character.name}</h3>
              <p className="text-sm text-gray-600">{character.species}</p>
            </div>
            <button 
              onClick={() => toggleFavorite(character)}
              className="text-red-500 hover:text-red-700"
              title="Quitar de favoritos"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;