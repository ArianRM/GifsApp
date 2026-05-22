import { useState } from "react";
import { GifsLists } from "./gifs/components/GifsLists";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = (query: string) => {
    // Añadir las busquedas anteriores
    // primero limpiar el string
    query.trim().toLowerCase();
    // validar el tamaño del string query
    if (query.length === 0) return;
    // validar si el query ya estaba en los previous terms
    if (previousTerms.includes(query)) return;
    // mostrar las busquedas en el front
    setPreviousTerms([query, ...previousTerms].splice(0, 8));

    console.log({ query });
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* SearchBar */}

      <SearchBar
        placeholder="Buscar lo que quieras..."
        onQuery={handleSearch}
      />

      {/* Búsquedas previas */}

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}

      <GifsLists gifs={mockGifs} />
    </>
  );
};
