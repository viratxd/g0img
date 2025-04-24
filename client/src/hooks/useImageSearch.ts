import { useEffect, useRef, useState } from "react";
import { getImagesFromGoogleSearch } from "../services/imageService";
import { IImage } from "../models/IImage";
import { loadSessionData, saveSessionData } from "../utils/sessionUtils";

export const useImageSearch = () => {
  const observerTarget = useRef(null);

  const {
    searchWord: storedWord,
    images: storedImages,
    searchTime: storedTime,
    correctedQuery: storedCorrection,
    page: storedPage,
  } = loadSessionData();

  const [searchWord, setSearchWord] = useState(storedWord);
  const [images, setImages] = useState<IImage[]>(storedImages);
  const [searchTime, setSearchTime] = useState(storedTime);
  const [correctedQuery, setCorrectedQuery] = useState(storedCorrection);
  const [page, setPage] = useState(storedPage);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (word: string, pageNum = 1, isLoadMore = false) => {
    if (!word) return;
    if (!isLoadMore) {
      setImages([]);
      setCorrectedQuery("");
      setPage(1);
      setSearchTime("");
    }

    setIsLoading(true);
    const startIndex = (pageNum - 1) * 10 + 1;

    try {
      const data = await getImagesFromGoogleSearch(word, startIndex);
      if (data.spelling?.correctedQuery) {
        setCorrectedQuery(data.spelling.correctedQuery);
        saveSessionData([], word, "", data.spelling.correctedQuery, pageNum);
        return;
      }

      const newImages = data.items || [];
      const newSearchTime = data.searchInformation?.formattedSearchTime || "";
      const combined = isLoadMore ? [...images, ...newImages] : newImages;

      setImages(combined);
      setSearchTime(newSearchTime);
      setCorrectedQuery("");
      setPage(pageNum);

      saveSessionData(combined, word, newSearchTime, "", pageNum);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        searchWord &&
        !correctedQuery
      ) {
        getData(searchWord, page + 1, true);
      }
    });

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [observerTarget.current, page, isLoading, searchWord, correctedQuery]);

  return {
    searchWord,
    searchTime,
    correctedQuery,
    images,
    isLoading,
    observerTarget,
    handleSearch: (text: string) => {
      setSearchWord(text);
      getData(text, 1, false);
    },
  };
};
