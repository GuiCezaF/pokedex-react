import "./App.css";
import PokemonList from "./components/PokemonCard/page";

function App() {

  return (
    <div className="container p-4">
      <h1 className="text-5xl flex justify-center">Lista de Pokémons</h1>
      <PokemonList/>
    </div>
  );
}

export default App;
