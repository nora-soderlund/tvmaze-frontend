import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tvmazeLogo from "../../assets/tvmaze-logo.png";
import PageContainer from "./PageContainer";
import "./PageHeader.css";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../form/IconButton";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import Input from "../form/Input";
import { tvInformationDataSource } from "../../data/tvinformation";
import TvInformationShow from "../../data/tvinformation/interfaces/TvInformationShow";
import useDynamicChange from "../../hooks/useDynamicChange";
import ShowThumbnail from "../shows/ShowThumbnail";
import LoadingDots from "../LoadingDots";
import Button from "../form/Button";

type PageHeaderProps = {
  children?: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  const [ searchVisible, setSearchVisible ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState<string | null>(null);
  const [ searchResults, setSearchResults ] = useState<TvInformationShow[] | null>(null);
  const [ searchAbortController, setSearchAbortController ] = useState<AbortController | null>(null);
  const [ searchError, setSearchError ] = useState<string | null>(null);

  useEffect(() => {
    if(searchQuery) {
      if(searchAbortController) {
        searchAbortController.abort("New search query.");
      }

      const abortController = new AbortController();

      setSearchAbortController(abortController);

      tvInformationDataSource.getShowsByQuery(searchQuery, abortController.signal).then((shows) => {
        setSearchResults(shows.filter((show) => show.image));
        setSearchAbortController(null);
      }).catch((reason) => {
        console.warn("Failed to find shows by query.", { reason });

        setSearchError("Failed to query for shows from the TV maze API.");

        setSearchAbortController(null);
      });
    }

    // searchAbortController is correctly not added as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchQuery ]);

  const handleCancelSearch = useCallback(() => {
    if(!searchAbortController) {
      console.info("There is no active search to cancel.");

      return;
    }

    searchAbortController.abort();
  }, [ searchAbortController ]);

  const handleToggleSearch = useCallback(() => {
    if(searchVisible) {
      handleCancelSearch();
    }

    setSearchVisible(!searchVisible);
  }, [ searchVisible, handleCancelSearch ]);

  return (
    <Fragment>
      <PageContainer>
        <header className={(searchVisible)?("page-header-transitioned"):(undefined)} data-testid="header">
          <div className="page-header-section">
            <a href="/" title="Go to the home page">
              <img className="page-header-logo" alt="TVMAZE" src={tvmazeLogo}/>
            </a>

            <div className="page-header-icons">
              <IconButton data-testid="icon-magnifying-glass" onClick={handleToggleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"2em"}/>
              </IconButton>
            </div>
          </div>

          <div className="page-header-section page-header-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={"1.5em"}/>

            <Input placeholder="Search for a show..." onChange={useDynamicChange((event) => event && setSearchQuery((event.target as HTMLInputElement).value))} data-testid="input"/>

            <IconButton data-testid="icon-times" onClick={handleToggleSearch}>
              <FontAwesomeIcon icon={faTimes} fontSize={"2em"}/>
            </IconButton>
          </div>
        </header>

        {(searchVisible) && (
          <Fragment>
            {(!searchAbortController)?(
              (searchError)?(
                <Fragment>
                  <h2>Something went wrong!</h2>

                  <p>{searchError}</p>
                </Fragment>
              ):(
                <Fragment>
                  <h2>Search results</h2>

                  {(searchResults?.length)?(
                    <div className="page-header-search-result">
                      {searchResults.map((show) => (
                        <a key={show.id} href={`/shows/${show.id}`}>
                          <ShowThumbnail show={show} data-testid="show-thumbnail"/>
                        </a>
                      ))}
                    </div>
                  ):(
                    <p>No result founds.</p>
                  )}
                </Fragment>
              )
            ):(
              (searchAbortController) && (
                <Fragment>
                  <LoadingDots data-testid="loading"/>

                  <div className="page-header-search-slow-client">
                    <p>Your search is taking longer than expected, this can be due to a slow internet connection.</p>

                    <Button onClick={handleCancelSearch}>Cancel search</Button>
                  </div>
                </Fragment>
              )
            )}
          </Fragment>
        )}
      </PageContainer>

      {(!searchVisible) && (
        children
      )}
    </Fragment>
  );
}
