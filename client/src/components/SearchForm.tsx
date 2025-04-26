import { useState, ChangeEvent, FormEvent } from "react";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { motion } from "framer-motion";

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
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchWord}
        onChange={handleChange}
        placeholder="Search images here..."
      />
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <SearchIcon width={24} height={24} />
      </motion.button>
    </form>
  );
};
