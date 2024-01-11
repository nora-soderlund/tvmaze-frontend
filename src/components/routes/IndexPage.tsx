import { useParams } from "react-router-dom";
import Page from "../page/Page";
import PageWallpaper from "../page/PageWallpaper";
import PageHeader from "../page/PageHeader";
import { Fragment, useCallback, useEffect, useState } from "react";
import TvInformationShowDetails from "../../data/tvinformation/interfaces/TvInformationShowDetails";
import { tvmazeDataSource } from "../../data/tvinformation";
import ShowFeature from "../shows/ShowFeature";
import PageMain from "../page/PageMain";
import PageContainer from "../page/PageContainer";
import ShowThumbnail from "../shows/ShowThumbnail";
import "./IndexPage.css";

const showsToFeature = [ 5, /*6, 9*/ ];
const genresToFeature = [ "Action", "Comedy", "Drama" ];

type GenreShowDetails = {
  genre: string;
  shows: TvInformationShowDetails[];
};

export default function IndexPage() {
  const [ featuredShowDetails, setFeaturedShowDetails ] = useState<TvInformationShowDetails | null>(null);
  const [ genreShowDetails, setGenreShowDetails ] = useState<GenreShowDetails[] | null>(null);

  useEffect(() => {
    const showId = showsToFeature[Math.floor(Math.random() * showsToFeature.length)];

    tvmazeDataSource.getShow(showId).then((showDetails) => {
      setFeaturedShowDetails(showDetails);
    });

    Promise.all(genresToFeature.map(async (genre) => {
      return {
        genre,
        shows: await tvmazeDataSource.getShowsByQuery(genre)
      };
    })).then((results) => {
      setGenreShowDetails(results);
    });
  }, []);

  const handleShowThumbnailClick = useCallback((showDetails: TvInformationShowDetails) => {
    setFeaturedShowDetails(showDetails);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, []);

  return (
    <Page>
      {(featuredShowDetails?.image) && (
        <PageWallpaper image={featuredShowDetails.image}/>
      )}

      <PageHeader>
        {(featuredShowDetails) && (
          <ShowFeature showDetails={featuredShowDetails}/>
        )}

        <PageContainer>
          {(genreShowDetails)?(
            genreShowDetails.map(({ genre, shows }) => (
              <Fragment key={genre}>
                <hr/>
                
                <h2>{genre} shows</h2>

                <div className="genre-shows">
                  {shows.filter((showDetails) => showDetails.image?.length).map((showDetails) => (
                    <ShowThumbnail key={showDetails.id} showDetails={showDetails} onClick={() => handleShowThumbnailClick(showDetails)}/>
                  ))}
                </div>
              </Fragment>
            ))
          ):(
            <div/>
          )}
        </PageContainer>
      </PageHeader>
    </Page>
  );
}
