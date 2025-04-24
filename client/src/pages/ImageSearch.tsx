import { SearchForm } from "../components/SearchForm";
import { ShowResult } from "../components/ShowResult";
import { useImageSearch } from "../hooks/useImageSearch";

export const ImageSearch = () => {
  const {
    searchWord,
    searchTime,
    correctedQuery,
    images,
    isLoading,
    observerTarget,
    handleSearch,
  } = useImageSearch();

  return (
    <div className="image-search">
      <h1>Image Search Page</h1>
      <SearchForm search={handleSearch} />
      <ShowResult
        searchTime={searchTime}
        correctedQuery={correctedQuery}
        images={images}
        isLoading={isLoading}
        searchWord={searchWord}
        search={handleSearch}
        scrollRef={observerTarget}
      />
    </div>
  );
};
