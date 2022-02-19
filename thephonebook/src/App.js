import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import axios from "axios";
import PersonsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);

  useEffect(() => {
    PersonsServices.getAll().then((resp) => {
      setPersons(resp);
      setSearchedArr(resp);
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
    const nName = newName.trim().toLowerCase();
    const personsNames = persons.map((person) => person.name.trim().toLowerCase());
    const personObject = { name: newName, number: newPhone, id: persons.length + 1 };
    if (personsNames.includes(nName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find((person) => person.name.trim().toLowerCase() === nName);
        PersonsServices.update(existingPerson.id, { ...personObject, id: existingPerson.id }).then((res) => {
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : res)));
          setSearchedArr(searchedArr.map((person) => (person.id !== existingPerson.id ? person : res)));
        });
      }
    } else if (newName !== "") {
      PersonsServices.create(personObject).then((res) => {
        setPersons(persons.concat(res));
        setSearchedArr(persons.concat(res));
      });
    }
    setNewName("");
    setNewPhone("");
    setSearching("");
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${persons[id - 1].name}?`)) {
      PersonsServices.erase(id).then((res) => {
        setPersons(persons.filter((person) => person.id !== id));
        setSearchedArr(searchedArr.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={searchingChange} searching={searching} />
      <h2>add new person</h2>
      <PersonForm addPerson={addPerson} nameChange={nameChange} phoneChange={phoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Display handleDelete={handleDelete} state={searchedArr} />
    </div>
  );
};

export default App;
