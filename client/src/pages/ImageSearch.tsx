import { useState } from "react";
import { SearchForm } from "../components/SearchForm";
import { ShowResult } from "../components/ShowResult";
import { getImagesFromGoogleSearch } from "../services/imageService";
import { SearchData } from "../models/SearchData";

export const ImageSearch = () => {
  const [searchData, setSearchData] = useState<SearchData>(
    new SearchData(
      JSON.parse(localStorage.getItem("Images") || "[]"),
      localStorage.getItem("Search time") || "",
      localStorage.getItem("Corrected query") || "",
      false,
      localStorage.getItem("Search word") || ""
    )
  );
  
  const getData = async (searchWord: string) => {
    localStorage.setItem("Search word", searchWord);
    setSearchData(prevSearchData => ({ ...prevSearchData, searchWord: searchWord }));
    
    try {
      setSearchData(prevSearchData => ({ ...prevSearchData, isLoading: true }));
      const data = await getImagesFromGoogleSearch(searchWord);
      
      if (data.spelling) {
        const correctedQuery = data.spelling.correctedQuery;

        setSearchData(prevSearchData => ({
          ...prevSearchData,
          images: [],
          searchTime: "",
          correctedQuery: correctedQuery,
        }));

        localStorage.setItem("Images", "[]");
        localStorage.setItem("Search time", "");
        localStorage.setItem("Corrected query", correctedQuery);

        return;
      }

      const images = data.items;
      const searchTime = data.searchInformation.formattedSearchTime;

      setSearchData(prevSearchData => ({
        ...prevSearchData,
        correctedQuery: "",
        images: images,
        searchTime: searchTime,
      }));

      localStorage.setItem("Images", JSON.stringify(images));
      localStorage.setItem("Corrected query", "");
      localStorage.setItem("Search time", searchTime);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchData(prevSearchData => ({ ...prevSearchData, isLoading: false }));
    }
  };

  return (
    <div className="image-search">
      <h1>Image Search Page</h1>
      <SearchForm search={getData} />
      <ShowResult
        searchTime={searchData.searchTime}
        correctedQuery={searchData.correctedQuery}
        images={searchData.images}
        isLoading={searchData.isLoading}
        searchWord={searchData.searchWord}
        search={getData}
      />
    </div>
  );
};
