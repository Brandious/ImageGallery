import { createContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import { HitType } from "../types/ResponseType";

export const SearchContext = createContext({
  query: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchHandler: (query: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatePage: (page: number) => {},
  results: [] as HitType[],
  loading: false,
});

// set delay for debounce function in milliseconds
const DELAY = 1000;

// Defining a simple HOC component
const SearchContextProvider = (props: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(20);
  const [loading, setIsLoading] = useState(false);
  const [results, setResults] = useState<HitType[]>([] as HitType[]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchHandler = (query: string) => {
    setQuery(query);
    setResults([]);
    setTotal(20);
    debouncedSearch(query, 1);
  };

  const updatePage = (page: number) => {
    debouncePage(query, page);
  };

  const fetchData = async (query: string, page: number = 1) => {
    // the input string is the query param for the api request
    setIsLoading(true);

    if (total < page * 20) {
      setIsLoading(false);
      return;
    }

    const res = await axios.get("", { params: { q: query, page: page } });
    const data = await res.data;

    setTotal(data.totalHits);

    if (page === 1) {
      setResults(data.hits as HitType[]);
      setIsLoading(false);
      return;
    }

    setResults((prev) => [...prev, ...data.hits]);
    setIsLoading(false);
  };

  function debounce(
    func: (query: string, page: number) => void,
    delay: number
  ) {
    return function (...args: [string, number]) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        func(args[0], args[1]);
        debounceTimeout.current = null;
      }, delay);
    };
  }

  const debouncedSearch = debounce(fetchData, DELAY);
  const debouncePage = debounce(fetchData, DELAY);

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query: query,
        searchHandler: searchHandler,
        updatePage: updatePage,
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
