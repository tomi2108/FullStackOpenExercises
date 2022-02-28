import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Display from "./components/Display";
import CountryDetails from "./components/CountryDetails";
import { Card, Container, Row, Alert } from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState([]);
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);
  const [viewMore, setViewmore] = useState([false, false, false, false, false, false, false, false, false, false]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((resp) => {
      const countriesSimple = resp.data.map((country) => {
        let capital = country.capital;
        if (capital == undefined) {
          capital = "This country has no capital";
        } else {
          capital = country.capital[0];
        }
        return { name: country.name.common, capital: capital, area: country.area, languages: country.languages, flag: country.flags.png };
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
    <Container>
      <Row>
        <Filter onChange={searchingChange} searching={searching} />
      </Row>
      <Row>
        <div>Matches: {searchedArr.length}</div>
      </Row>
      <br />
      {searchedArr.length > 10 ? (
        <Alert variant="danger">{"Too many matches, specify another filter"}</Alert>
      ) : searchedArr.length > 1 ? (
        <Display viewMore={viewMore} onClick={handleViewMore} state={searchedArr} />
      ) : searchedArr.length === 1 ? (
        <Card style={{ width: "400px" }}>
          <Card.Body>
            <CountryDetails arr={searchedArr} />
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
