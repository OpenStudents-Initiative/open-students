import { IntlShape, useIntl } from "react-intl";
import SearchBar from "./searchBar/SearchBar";
import { SearchResultsList } from "./searchBar/SearchResultsList";
import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AUTH_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavBar() {
  const intl = useIntl();
  const userAuthenticated = useIsAuthenticated()();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const textConstants = {
    login: intl.formatMessage({ id: "headerLogin" }),
    openStudents: intl.formatMessage({ id: "openStudents" }),
    account: intl.formatMessage({ id: "headerAccount" }),
  };

  const text = userAuthenticated ? textConstants.account : textConstants.login;
  const [results, setResults] = useState<{ name: string; id: string }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");

  return (
    <nav className="bg-background flex justify-between items-center p-4 shadow-md sticky top-0 right-0 left-0 z-50">
      <LogoOpenStudents setInput={setInput} />
      {userAuthenticated && (
        <>
          <SearchBar
            input={input}
            setInput={setInput}
            results={results}
            setResults={setResults}
            setShowResults={setShowResults}
          />
          {showResults && (
            <SearchResultsList
              results={results}
              setInput={setInput}
              setShowResults={setShowResults}
            />
          )}
        </>
      )}
      <LoginButton
        text={text}
        navigate={navigate}
        anchorEl={anchorEl}
        signOut={signOut}
        userAuthenticated={userAuthenticated}
        handleMenu={handleMenu}
        handleClose={handleClose}
        intl={intl}
        setInput={setInput}
      />
    </nav>
  );
}

interface LogoOpenStudentsProps {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const LogoOpenStudents = ({ setInput }: LogoOpenStudentsProps) => (
  <Link to={HOME_ROUTE} onClick={() => setInput("")}>
    <img
      className="h-8"
      src="/openstudents-high-resolution-logo-transparent.png"
      alt="Logo Open Students"
    />
  </Link>
);

const LoginButton = ({
  text,
  navigate,
  userAuthenticated,
  signOut,
  handleClose,
  intl,
  setInput,
}: {
  text: string | undefined;
  navigate: NavigateFunction;
  userAuthenticated: boolean;
  anchorEl: HTMLElement | null;
  signOut: () => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  intl: IntlShape;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <>
    {!userAuthenticated ? (
      <Button
        onClick={() => {
          navigate(AUTH_ROUTE);
        }}
      >
        {text}
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>{text}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setInput("");
              navigate(PROFILE_ROUTE);
              handleClose();
            }}
          >
            {intl.formatMessage({ id: "headerProfile" })}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
              navigate(HOME_ROUTE);
            }}
          >
            {intl.formatMessage({ id: "headerLogout" })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </>
);
