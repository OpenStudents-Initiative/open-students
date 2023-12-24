import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../App";
import "../styles//SearchBar.css";

interface SearchBarProps {
    results: Array<{ name: string, id: string }>,
    setResults: React.Dispatch<React.SetStateAction<{ name: string, id: string }[]>>;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({ results, setResults, setShowResults }: SearchBarProps ) => {

    const [professorNames, setProfessorNames] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        let { data: professorNames, error } = await supabase
            .from('professor')
            .select('name, id')

        console.log(professorNames);

        if (error) {
            console.log(error);
            return;
        }

        setProfessorNames(professorNames);
    };

    useEffect(() => {
        if (!input) {
            setResults([]);
            return;
        }

        const profs: { name: string, id: string }[] =
            professorNames.filter(({ name }: { name: string, id: string }) => name.toLowerCase().includes(input.toLowerCase()));
        setResults(profs);

        setShowResults(results && results.length > 0);
    }, [input]);


    const handleChange = (value: string) => {
        setInput(value);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};