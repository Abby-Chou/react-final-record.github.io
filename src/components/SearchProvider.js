import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  return (
    <SearchContext.Provider
      value={{ search, setSearch, appliedSearch, setAppliedSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}
