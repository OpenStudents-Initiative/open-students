import { useNavigate } from "react-router-dom";
import "../../styles/SearchResult.css";
import { PROFESSORS_ROUTE } from "@/utils/consts";

interface SearchResultProps {
  result: {
    name: string;
    id: string;
  };
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchResult = ({
  result,
  setShowResults,
  setInput,
}: SearchResultProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    setShowResults(false);
    setInput(result.name);
    navigate(`${PROFESSORS_ROUTE}/${result.id}`);
  };
  return (
    <div
      className="p-4 hover:bg-primary hover:text-background cursor-pointer"
      onClick={handleOnClick}
    >
      {result.name}
    </div>
  );
};
