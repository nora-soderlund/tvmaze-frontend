import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tvmazeLogo from "../../assets/tvmaze-logo.png";
import PageContainer from "./PageContainer";
import "./PageHeader.css";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../form/IconButton";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Input from "../form/Input";
import { tvmazeDataSource } from "../../data/tvinformation";
import TvInformationShowDetails from "../../data/tvinformation/interfaces/TvInformationShowDetails";
import useDynamicChange from "../../hooks/useDynamicChange";
import ShowThumbnail from "../shows/ShowThumbnail";
import { redirect } from "react-router-dom";

type PageHeaderProps = {
  children?: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  const [ searchVisible, setSearchVisible ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState<string | null>(null);
  const [ searchResults, setSearchResults ] = useState<TvInformationShowDetails[] | null>(null);
  const [ searchAbortController, setSearchAbortController ] = useState<AbortController | null>(null);

  useEffect(() => {
    if(searchQuery) {
      if(searchAbortController) {
        searchAbortController.abort("New search query.");
      }

      const abortController = new AbortController();

      setSearchAbortController(abortController);

      tvmazeDataSource.getShowsByQuery(searchQuery, abortController.signal).then((shows) => {
        setSearchResults(shows);
      });
    }
  }, [ searchQuery ]);

  return (
    <Fragment>
      <PageContainer>
        <header className={(searchVisible)?("page-header-transitioned"):(undefined)} data-testid="header">
          <div className="page-header-section">
            <a href="/" title="Go to the home page">
              <img className="page-header-logo" alt="TVMAZE" src={tvmazeLogo}/>
            </a>

            <div className="page-header-icons">
              <IconButton data-testid="icon-magnifying-glass" onClick={() => setSearchVisible(!searchVisible)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"2em"}/>
              </IconButton>
            </div>
          </div>

          <div className="page-header-section page-header-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"1.5em"}/>

            <Input placeholder="Search for a show..." onChange={useDynamicChange((event) => setSearchQuery((event.target as HTMLInputElement).value))} data-testid="input"/>

            <IconButton data-testid="icon-times" onClick={() => setSearchVisible(!searchVisible)}>
              <FontAwesomeIcon icon={faTimes} fontSize={"2em"}/>
            </IconButton>
          </div>
        </header>

        {(searchVisible) && (
          (searchResults !== null)?(
            <Fragment>
              <h2>Search results</h2>

              <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1em"
              }}>
                {searchResults.map((showDetails) => (
                  <ShowThumbnail key={showDetails.id} showDetails={showDetails} onClick={() => redirect(`/shows/${showDetails.id}`)} data-testid="show-thumbnail"/>
                ))}
              </div>
            </Fragment>
          ):(
            (searchAbortController) && (
              <h2 data-testid="loading">Loading</h2>
            )
          )
        )}
      </PageContainer>

      {(!searchVisible || !searchResults) && (
        children
      )}
    </Fragment>
  );
}
