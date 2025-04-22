import { useEffect, useState } from "react";
import { SearchForm } from "../components/SearchForm";
import { ShowResult } from "../components/ShowResult";
import { getImagesFromGoogleSearch } from "../services/imageService";
import { SearchData } from "../models/SearchData";

export const ImageSearch = () => {
  const [searchData, setSearchData] = useState<SearchData>(
    new SearchData(
      JSON.parse(sessionStorage.getItem("Images") || "[]"),
      sessionStorage.getItem("Search time") || "",
      sessionStorage.getItem("Corrected query") || "",
      false,
      sessionStorage.getItem("Search word") || ""
    )
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("Images");
      sessionStorage.removeItem("Search time");
      sessionStorage.removeItem("Corrected query");
      sessionStorage.removeItem("Search word");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getData = async (searchWord: string) => {
    sessionStorage.setItem("Search word", searchWord);
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      searchWord: searchWord,
    }));

    try {
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        isLoading: true,
      }));
      const data = await getImagesFromGoogleSearch(searchWord);

      if (data.spelling) {
        const correctedQuery = data.spelling.correctedQuery;

        setSearchData((prevSearchData) => ({
          ...prevSearchData,
          images: [],
          searchTime: "",
          correctedQuery: correctedQuery,
        }));

        sessionStorage.setItem("Images", "[]");
        sessionStorage.setItem("Search time", "");
        sessionStorage.setItem("Corrected query", correctedQuery);

        return;
      }

      const images = data.items;
      const searchTime = data.searchInformation.formattedSearchTime;

      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        correctedQuery: "",
        images: images,
        searchTime: searchTime,
      }));

      sessionStorage.setItem("Images", JSON.stringify(images));
      sessionStorage.setItem("Corrected query", "");
      sessionStorage.setItem("Search time", searchTime);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        isLoading: false,
      }));
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
