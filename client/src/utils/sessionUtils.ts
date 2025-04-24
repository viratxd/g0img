export const loadSessionData = () => ({
  searchWord: sessionStorage.getItem("Search word") || "",
  images: JSON.parse(sessionStorage.getItem("Images") || "[]"),
  searchTime: sessionStorage.getItem("Search time") || "",
  correctedQuery: sessionStorage.getItem("Corrected query") || "",
  page: Number(sessionStorage.getItem("Page")) || 1,
});

export const saveSessionData = (
  images: any[],
  word: string,
  time: string,
  corrected: string,
  page: number
) => {
  sessionStorage.setItem("Images", JSON.stringify(images));
  sessionStorage.setItem("Search word", word);
  sessionStorage.setItem("Search time", time);
  sessionStorage.setItem("Corrected query", corrected);
  sessionStorage.setItem("Page", page.toString());
};
