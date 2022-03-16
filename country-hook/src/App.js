import { useState } from "react";
import { useField, useCountry } from "./hooks";
import Country from "./components/Country";

const App = () => {
  const [name, setName] = useState("");

  const country = useCountry(name);
  const nameInput = useField("text");

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
