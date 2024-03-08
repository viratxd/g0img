import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { useState } from "react";
import { IImage } from "../models/IImage";
import { SearchForm } from "../components/SearchForm";

export const ImageSearch = () => {
  const [images, setImages] = useState<IImage[]>();
  const [searchTime, setSearchTime] = useState("");
  const [correctedQuery, setCorrectedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (searchWord: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=${
          import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
        }&q=${searchWord}&num=10&searchType=image`
      );
      const data = await response.data;
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
      {isLoading ? (
        <span>loading</span>
      ) : (
        <section>
          {searchTime ? <p>{searchTime}sec</p> : <></> }
          {correctedQuery ? (
            <p>
              Did you mean
              <a onClick={() => getData(correctedQuery)}>{correctedQuery}</a> ?
            </p>
          ) : (
            <></>
          )}
          {images?.map((image) => (
            <figure>
              <img src={image.link} alt={image.title} />
            </figure>
          ))}
        </section>
      )}
      <LogoutButton />
    </>
  );
};
