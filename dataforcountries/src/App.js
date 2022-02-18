import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Display from "./components/Display";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);
  const [viewMore, setViewmore] = useState([false, false, false, false, false, false, false, false, false, false]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((resp) => {
      const countriesSimple = resp.data.map((country) => {
        return { name: country.name.common, capital: country.capital, area: country.area, languages: country.languages, flag: country.flags.png };
      });
      setCountries(countriesSimple);
      setSearchedArr(countriesSimple);
    });
  }, []);

  const handleViewMore = (e) => {
    e.preventDefault();
    const showMore = e.target.id;
    const newViewMore = [...viewMore];
    newViewMore[showMore] = !newViewMore[showMore];
    setViewmore(newViewMore);
  };

  const searchingChange = (e) => {
    const s = e.target.value.toLowerCase();
    if (s === "") {
      setViewmore([false, false, false, false, false, false, false, false, false, false]);
    }
    setSearching(s);
    const regex = new RegExp(s, "g");
    const filtArr = countries.filter((country) => country.name.toLowerCase().match(regex) !== null);
    setSearchedArr(filtArr);
  };

  return (
    <div>
      <Filter onChange={searchingChange} searching={searching} />
      <div>matches: {searchedArr.length}</div>
      {searchedArr.length > 10 ? "Too many matches, specify another filter" : searchedArr.length > 1 ? <Display viewMore={viewMore} onClick={handleViewMore} state={searchedArr} /> : searchedArr.length === 1 ? <CountryDetails arr={searchedArr} /> : ""}
    </div>
  );
}

export default App;
