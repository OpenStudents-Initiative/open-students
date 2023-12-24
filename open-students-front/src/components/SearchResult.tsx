import "../styles/SearchResult.css";

interface SearchResultProps {
    result: {
        name: string;
        id: string;
    };
    setCurrentProfessorId: React.Dispatch<React.SetStateAction<string>>;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResult = ({ result, setCurrentProfessorId, setShowResults }: SearchResultProps) => {
    return (
        <div
            className="search-result"
            onClick={() => {
                setCurrentProfessorId(result.id)
                setShowResults(false)
            }}
        >
            {result.name}
        </div>
    );
};
