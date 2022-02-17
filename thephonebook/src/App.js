import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState(
    persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))
  );

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
    setSearchedArr(
      filtArr.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))
    );
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = { name: newName, number: newPhone, id: persons.length + 1 };
    const personsNames = persons.map((person) => person.name.trim().toLowerCase());
    if (personsNames.includes(newName.trim().toLowerCase())) {
      alert(`${newName} is already in the phonebook`);
    } else if (newName !== "") {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhone("");
      setSearching("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={searchingChange} searching={searching} />
      <h2>add new person</h2>
      <PersonForm addPerson={addPerson} nameChange={nameChange} phoneChange={phoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      {searchedArr}
    </div>
  );
};

export default App;
