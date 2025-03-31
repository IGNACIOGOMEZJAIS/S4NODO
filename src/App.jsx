import CharacterCard from "./components/CharacterCard";
import CharacterCountForm from "./components/CharacterCount";
import FavoritesList from "./components/FavoritesList";
import { CharacterProvider } from "./context/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Rick and Morty Personajes
          </h1>
          <CharacterCountForm />
          <FavoritesList />
          <CharacterCard />
        </div>
      </div>
    </CharacterProvider>
  );
}

export default App;