import { createContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import { HitType } from "../types/ResponseType";

export const SearchContext = createContext({
  query: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchHandler: (query: string) => {},
  results: [] as HitType[],
  loading: false,
});

// set delay for debounce function in milliseconds
const DELAY = 1000;

// Defining a simple HOC component
const SearchContextProvider = (props: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [results, setResults] = useState<HitType[]>([] as HitType[]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchHandler = (query: string) => {
    setQuery(query);
    debouncedSearch(query);
  };

  const fetchData = async (query: string) => {
    // the input string is the query param for the api request
    setIsLoading(true);
    const res = await axios.get("", { params: { q: query } });
    const data = await res.data;

    setResults(data.hits as HitType[]);
    setIsLoading(false);
  };

  function debounce(func: (query: string) => void, delay: number) {
    return function (...args: string[]) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        func(args[0]);
        debounceTimeout.current = null;
      }, delay);
    };
  }

  const debouncedSearch = debounce(fetchData, DELAY);

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query: query,
        searchHandler: searchHandler,
        results: results,
        loading: loading,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
  results;
};

export default SearchContextProvider;
