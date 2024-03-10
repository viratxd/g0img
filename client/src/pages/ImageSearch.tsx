import { useState } from "react";
import { IImage } from "../models/IImage";
import { SearchForm } from "../components/SearchForm";
import { ShowResult } from "../components/ShowResult";
import { getImages } from "../services/imageService";

export const ImageSearch = () => {
  const [images, setImages] = useState<IImage[]>(
    JSON.parse(localStorage.getItem("Images") || "[]")
  );
  const [searchTime, setSearchTime] = useState(
    localStorage.getItem("Search time") || ""
  );
  const [correctedQuery, setCorrectedQuery] = useState(
    localStorage.getItem("Corrected query") || ""
  );

  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("Search word") || ""
  );

  const getData = async (searchWord: string) => {
    localStorage.setItem("Search word", searchWord);
    setSearchWord(searchWord);

    try {
      setIsLoading(true);
      const data = await getImages(searchWord);

      if (data.spelling) {
        localStorage.setItem("Images", "[]");
        setImages([]);
        localStorage.setItem("Search time", "");
        setSearchTime("");

        const correctedQuery = data.spelling.correctedQuery;
        localStorage.setItem("Corrected query", correctedQuery);
        setCorrectedQuery(correctedQuery);
        return;
      }

      localStorage.setItem("Corrected query", "");
      setCorrectedQuery("");

      const images = data.items;
      localStorage.setItem("Images", JSON.stringify(images));
      setImages(images);

      const searchTime = data.searchInformation.formattedSearchTime;
      localStorage.setItem("Search time", searchTime);
      setSearchTime(searchTime);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-search">
      <h1>Image Search Page</h1>
      <SearchForm search={getData} />
      <ShowResult
        searchTime={searchTime}
        correctedQuery={correctedQuery}
        images={images}
        isLoading={isLoading}
        search={getData}
        searchWord={searchWord}
      />
    </div>
  );
};
