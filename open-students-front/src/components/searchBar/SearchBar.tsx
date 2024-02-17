import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/SearchBar.css";
import { useIntl } from "react-intl";
import levensthein from "js-levenshtein";
import { fetchProfessorsWithKeys } from "../../services/professorService";

interface SearchBarProps {
  results: Array<{ name: string; id: string }>;
  setResults: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ results, setResults, setShowResults }: SearchBarProps) => {
  const intl = useIntl();
  const searchProfessors = intl.formatMessage({ id: "searchProfessors" });

  const [professorNames, setProfessorNames] = useState<
    { name: string; id: string }[]
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchAndSetProfessorNames(setProfessorNames);
  }, []);

  useEffect(() => {
    if (!input) {
      setResults([]);
      return;
    }
    console.log("Searching for professors");

    const profs = professorNamesToStrList(input, professorNames);
    setResults(profs);

    console.log("Setting show results");

    setShowResults(results && results.length > 0);
  }, [input]);

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder={searchProfessors}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

async function fetchAndSetProfessorNames(
  setProfessorNames: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >,
) {
  const professorNames = await fetchProfessorsWithKeys(["name", "id"]);
  setProfessorNames(professorNames);
}

function professorNamesToStrList(
  input: string,
  professorNames: { name: string; id: string }[],
) {
  const sortedProfNames: { name: string; id: string }[] = professorNames
    .map((value) => {
      const normalizedName = value.name.normalize();
      return {
        name: normalizedName,
        id: value.id,
        // Levensthein distance is biased towards string length, this
        // should normalize the distance and reduce this bias
        score: levensthein(normalizedName, input) / normalizedName.length,
      };
    })
    .sort((a, b) => a.score - b.score)
    .map((value) => {
      console.log(value);
      return { name: value.name, id: value.id };
    })
    .slice(0, 5);

  return sortedProfNames;
}
