import { useState } from "react";
import { useCharacter } from "../context/CharacterContext";

const CharacterCountForm = () => {
  const { characterCount, setCharacterCount, getCharacter,name,setName } = useCharacter();
  const [count, setCount] = useState(characterCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCharacterCount(count);
    if (name.trim() !== '') getCharacter(name, count);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del personaje
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Rick"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad de personajes
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            >
              {[5, 10, 20].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-end">
          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CharacterCountForm;