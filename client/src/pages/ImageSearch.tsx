import LogoutButton from "../components/LogoutButton";
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

  const getData = async (searchWord: string) => {
    try {
      setIsLoading(true);
      const data = await getImages(searchWord);
      console.log(data);

      if (data.spelling) {
        setCorrectedQuery(data.spelling.correctedQuery);
        return;
      }

      setImages(data.items);
      setSearchTime(data.searchInformation.formattedSearchTime);
      console.log(searchTime);

    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Image Search Page</h1>
      <SearchForm search={getData} />
      <ShowResult
        searchTime={searchTime}
        correctedQuery={correctedQuery}
        images={images}
        isLoading={isLoading}
      />
      <LogoutButton />
    </>
  );
};
