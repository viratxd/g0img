import { useState, ChangeEvent, FormEvent } from "react";

interface ISearchFormProps {
  search: (text: string) => void;
}
export const SearchForm = ({ search }: ISearchFormProps) => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(searchWord);
    setSearchWord("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchWord} onChange={handleChange} />
      <button>Search</button>
    </form>
  );
};
