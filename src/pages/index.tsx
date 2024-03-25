import { useContext } from "react";
import { ImageGrid } from "../components/ImageGrid";
import { SearchInput } from "../components/SearchInput";
import { SearchContext } from "../context/ImageContext";

export const Index = () => {
  const { results, loading, updatePage } = useContext(SearchContext);

  return (
    <div className="flex items-center justify-between p-6 lg:px-8 flex-col gap-12">
      <SearchInput />
      <ImageGrid results={results} loading={loading} updatePage={updatePage} />
    </div>
  );
};
