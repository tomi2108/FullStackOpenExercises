import React from "react";

const CountryDetails = ({ arr }) => {
  const country = arr[0];

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital:{country.capital}</p>
      <p>area:{country.area}</p>
      <ul>
        Language:
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} />
    </>
  );
};

export default CountryDetails;
