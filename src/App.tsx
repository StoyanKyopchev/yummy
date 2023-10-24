import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import RecipeDetails from "./Pages/RecipeDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results/:searched" element={<SearchResults />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
}

export default App;
