import { useState } from "react";
import { IImage } from "../models/IImage";
import { SearchForm } from "../components/SearchForm";
import { ShowResult } from "../components/ShowResult";
import { getImages } from "../services/imageService";

export const ImageSearch = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [searchTime, setSearchTime] = useState("");
  const [correctedQuery, setCorrectedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const getData = async (searchWord: string) => {
    setImages([]);
    setSearchTime("");
    setSearchWord(searchWord);

    try {
      setIsLoading(true);
      const data = await getImages(searchWord);

      if (data.spelling) {
        setCorrectedQuery(data.spelling.correctedQuery);
        return;
      }

      setCorrectedQuery("");
      setImages(data.items);
      setSearchTime(data.searchInformation.formattedSearchTime);
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
