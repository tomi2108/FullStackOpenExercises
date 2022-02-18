import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      setPersons(resp.data);
      setSearchedArr(resp.data);
    });
  }, []);

  const nameChange = (e) => {
    setNewName(e.target.value);
  };
  const phoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const searchingChange = (e) => {
    const s = e.target.value.toLowerCase();
    setSearching(s);
    const regex = new RegExp(s, "g");
    const filtArr = persons.filter((person) => person.name.toLowerCase().match(regex) !== null);
    setSearchedArr(filtArr);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personsNames = persons.map((person) => person.name.trim().toLowerCase());
    if (personsNames.includes(newName.trim().toLowerCase())) {
      alert(`${newName} is already in the phonebook`);
    } else if (newName !== "") {
      const personObject = { name: newName, number: newPhone, id: persons.length + 1 };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone("");
      setSearching("");
      setSearchedArr(persons.concat(personObject));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={searchingChange} searching={searching} />
      <h2>add new person</h2>
      <PersonForm addPerson={addPerson} nameChange={nameChange} phoneChange={phoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Display state={searchedArr} />
    </div>
  );
};

export default App;
