import { useCharacter } from "../context/CharacterContext";
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CharacterCard = () => {
  const { 
    characterData, 
    loading, 
    favorites,
    expandedId,
    apiError,
    toggleFavorite,
    toggleExpand,
    getCharacter,
    characterCount,
  } = useCharacter();

  const handleFavoriteClick = (character) => {
    const isFavorite = favorites.some(fav => fav.id === character.id);
    toggleFavorite(character);
    
    toast.success(
      `${character.name} ${isFavorite ? 'Eliminado a' : 'Agregado a'} favoritos`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      }
    );
  };

  const handleRetry = () => {
    if (apiError?.searchTerm) {
      getCharacter(apiError.searchTerm, characterCount);
    }
  };

  // Manejo de estados de error y carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <SyncLoader 
          color="#3B82F6"
          size={15}
          margin={5}
          speedMultiplier={0.8}
        />
        <span className="mt-4 text-blue-500">Searching characters...</span>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="text-center py-10 px-4">
        <div className={`max-w-md mx-auto p-6 rounded-lg ${
          apiError.status === 404 
            ? 'bg-yellow-50 border-l-4 border-yellow-400' 
            : 'bg-red-50 border-l-4 border-red-400'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {apiError.status === 404 ? (
                <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">
                {apiError.status === 404 ? 'No characters found' : 'API Error'}
              </h3>
              <div className="mt-2 text-sm">
                <p>{apiError.message}</p>
                {apiError.status === 404 && (
                  <p className="mt-1">Realiza una diferente busqueda.</p>
                )}
              </div>
              <button
                onClick={handleRetry}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!characterData?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Comienza la busqueda</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      
      <div className="mb-4 px-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {characterData.length} de {characterCount} Personajes
        </p>
        
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {characterData.map((character) => (
          <div
            key={character.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs mx-auto hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-400 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800 truncate">{character.name}</h2>
            <p className="text-gray-600">
              {character.species} - 
              <span className={character.status === 'Alive' ? 'text-green-500' : 'text-red-500'}>
                {" " + character.status}
              </span>
            </p>
            
            <button 
              onClick={() => toggleExpand(character.id)}
              className="text-blue-500 text-sm mt-2 hover:underline focus:outline-none"
            >
              {expandedId === character.id ? 'Hide details' : 'Show details'}
            </button>

            {expandedId === character.id && (
              <div className="mt-3 text-left text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Genero:</span> {character.gender}</p>
                <p><span className="font-semibold">Tipo:</span> {character.type || 'Unknown'}</p>
                <p><span className="font-semibold">Origen:</span> {character.origin.name}</p>
                <p><span className="font-semibold">Ubicacion:</span> {character.location.name}</p>
                <p><span className="font-semibold">Episodio:</span> {character.episode.length}</p>
              </div>
            )}

            <button 
              onClick={() => handleFavoriteClick(character)}
              className={`mt-4 w-full rounded-lg py-2 px-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                favorites.some(fav => fav.id === character.id) 
                  ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500' 
                  : 'bg-amber-400 hover:bg-amber-300 text-gray-800 focus:ring-amber-500'
              }`}
            >
              {favorites.some(fav => fav.id === character.id) 
                ? '★ Eliminar Favorito' 
                : '☆ Agregar Favorito'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterCard;