import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { useEffect, useState } from "react";
import { IImage } from "../models/IImage";

export const ImageSearch = () => {
  const [images, setImages] = useState<IImage[]>();
  const [searchTime, setSearchTime] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=${
          import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
        }&q=panda&num=10&searchType=image`
      );
      const data = await response.data;
      setImages(data.items);
      setSearchTime(data.searchInformation.formattedSearchTime);
      console.log(data);
    };
    getData();
  }, []);
  console.log(searchTime);

  return (
    <>
      <h1>Image Search Page</h1>
      <div>
        <p>{searchTime}sec</p>
        {images?.map((image) => (
          <figure>
            <img src={image.link} alt={image.title} />
          </figure>
        ))}
      </div>
      <LogoutButton />
    </>
  );
};
