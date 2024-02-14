import { SetterOrUpdater } from "recoil";
import "../../styles/SearchResult.css";

interface SearchResultProps {
  result: {
    name: string;
    id: string;
  };
  setCurrentProfessorId: SetterOrUpdater<string>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchResult = ({
  result,
  setCurrentProfessorId,
  setShowResults,
}: SearchResultProps) => {
  return (
    <div
      className="search-result"
      onClick={() => {
        console.log("i got click, res? ", result);
        setCurrentProfessorId(result.id);
        setShowResults(false);
      }}
    >
      {result.name}
    </div>
  );
};
