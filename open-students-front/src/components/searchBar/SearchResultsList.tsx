import { SetterOrUpdater } from "recoil";
import "../../styles/SearchResultsList.css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  results: Array<{ name: string; id: string }>;
  setCurrentProfessorId: SetterOrUpdater<string>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResultsList = ({
  results,
  setCurrentProfessorId,
  setShowResults,
}: SearchResultsListProps) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result}
            key={id}
            setCurrentProfessorId={setCurrentProfessorId}
            setShowResults={setShowResults}
          />
        );
      })}
    </div>
  );
};
