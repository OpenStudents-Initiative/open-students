import { IntlShape, useIntl } from "react-intl";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { COLORS } from "../styles/colors";
import SearchBar from "./searchBar/SearchBar";
import { SearchResultsList } from "./searchBar/SearchResultsList";
import { useState } from "react";
import { Typography } from "@mui/material";
import "../styles/Header.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentProfessorIdState } from "../atoms/defaultAtoms";
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

export default function Header() {
  const intl = useIntl();
  const userAuthenticated = useIsAuthenticated()();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const setCurrentProfessorId = useSetRecoilState(currentProfessorIdState);
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

  return (
    <Box className="header">
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar className="first-row">
          <LogoOpenStudents
            openStudentsText={textConstants.openStudents}
            navigate={navigate}
          />
          {userAuthenticated && (
            <Box className="search-bar-container">
              <SearchBar
                results={results}
                setResults={setResults}
                setShowResults={setShowResults}
              />
              {showResults && (
                <SearchResultsList
                  results={results}
                  setCurrentProfessorId={setCurrentProfessorId}
                  setShowResults={setShowResults}
                />
              )}
            </Box>
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
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const LogoOpenStudents = ({
  openStudentsText,
  navigate,
}: {
  openStudentsText: string;
  navigate: NavigateFunction;
}) => (
  <Toolbar>
    <Typography
      variant="h5"
      style={{ color: COLORS.primary, fontWeight: "bold" }}
      onClick={() => navigate("/")}
    >
      {openStudentsText}
    </Typography>
  </Toolbar>
);

const LoginButton = ({
  text,
  navigate,
  userAuthenticated,
  signOut,
  handleClose,
  intl,
}: {
  text: string | undefined;
  navigate: NavigateFunction;
  userAuthenticated: boolean;
  anchorEl: HTMLElement | null;
  signOut: () => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  intl: IntlShape;
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
