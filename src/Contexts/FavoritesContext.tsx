import React from "react";
import { Recipe } from "../Components/PopularRecipes";

interface FavoritesProps {
  children: React.ReactNode;
}

export const FavoritesContext = React.createContext<Recipe[]>([]);

export function FavoritesProvider({ children }: FavoritesProps) {
  const favorites: Recipe[] = [];

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
}
