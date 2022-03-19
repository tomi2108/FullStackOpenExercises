import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR } from "../queries";

const SetAuthorsBirth = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const [updateAuthor] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name: selectValue, born: Number(born) } });
    setBorn("");
  };

  return (
    <div>
      <h1>Set author birth year</h1>
      <form onSubmit={submit}>
        <select onChange={(e) => setSelectValue(e.target.value)}>
          Select author
          {authors.map((a) => {
            return (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            );
          })}
        </select>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetAuthorsBirth;
