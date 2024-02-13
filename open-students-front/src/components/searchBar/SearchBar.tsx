import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../App";
import "../../styles/SearchBar.css";
import { useIntl } from "react-intl";
import axios from "axios";
import { apiUrl } from "../../config";

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
    fetchProfessorNames(setProfessorNames);
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

async function fetchProfessorNames(
  setProfessorNames: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }[]>
  >,
) {
  try {
    const professorNames: { name: string; id: string }[] = await axios.get(
      `${apiUrl}/professors`,
      {
        params: {
          keys: "name,id",
        },
      },
    );
    setProfessorNames(professorNames);
  } catch (e) {
    console.error(`Error fetching professor names: ${e}`);
  }
}

function professorNamesToStrList(
  input: string,
  professorNames: { name: string; id: string }[],
) {
  const profs: { name: string; id: string }[] = professorNames
    .filter(({ name }: { name: string; id: string }) =>
      name.toLowerCase().includes(input.toLowerCase()),
    )
    .sort(
      (a: { name: string; id: string }, b: { name: string; id: string }) =>
        a.name.toLowerCase().indexOf(input.toLowerCase()) -
        b.name.toLowerCase().indexOf(input.toLowerCase()),
    );

  return profs;
}
