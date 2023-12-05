import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import RecipeDetails from "./Pages/RecipeDetails";
import Cuisine from "./Pages/Cuisine";
import AccountDashboard from "./Pages/Authentication/AccountDashboard";
import SignUp from "./Pages/Authentication/SignUp";
import SignIn from "./Pages/Authentication/SignIn";
import AccountUpdate from "./Pages/Authentication/AccountUpdate";
import PasswordReset from "./Pages/Authentication/PasswordReset";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results/:searched" element={<SearchResults />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/cuisine/:name" element={<Cuisine />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/account-dashboard" element={<AccountDashboard />} />
        <Route path="/account-update" element={<AccountUpdate />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </>
  );
}

export default App;
