import { useState } from "react";
import styles from "./SearchBar.module.scss";

interface Props {
  onSearch: (searchTerm: string, searchOption: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("이름");

  const handleSearch = () => {
    onSearch(searchTerm, searchOption);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.search_box}>
      <span className={styles.search_option}>
        <button
          className={searchOption === "이름" ? styles.active : ""}
          onClick={() => setSearchOption("이름")}
        >
          이름
        </button>
        <button
          className={searchOption === "제목" ? styles.active : ""}
          onClick={() => setSearchOption("제목")}
        >
          제목
        </button>
      </span>
      <div className={styles.search_bar}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className={styles.search_icon} onClick={handleSearch}>
          <img
            className={styles.search_img}
            onClick={handleSearch}
            src="../../assets/search_icon.png"
            alt="search icon"
          />
        </button>
      </div>
    </div>
  );
}
