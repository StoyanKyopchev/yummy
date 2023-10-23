import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results/:searched" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
