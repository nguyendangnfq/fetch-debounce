import "./App.css";
import { useEffect, useRef, useState } from "react";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const typingRef = useRef(null);

  const debounced = useDebounce(value, 500);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${debounced}`
        );
        const data = await response.json();
        const result = await data.hits;
        console.log(result);
        setSearchResult(result);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getApi();
    typingRef.current.focus();
  }, [debounced]);
  return (
    <div className="App">
      <form action="">
        <input
          type="text"
          ref={typingRef}
          onChange={handleChangeInput}
          value={value}
        />
      </form>
      <ul>
        {searchResult.map((item) => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
