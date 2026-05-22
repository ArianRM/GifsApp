import { useState } from "react";
import { GifsLists } from "./gifs/components/GifsLists";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { GetGifsByQuery } from "./gifs/actions/GetGifsByQuery.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string) => {
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

    const gifs = await GetGifsByQuery(query);
    setGifs(gifs);
    console.log({ gifs });
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

      <GifsLists gifs={gifs} />
    </>
  );
};
