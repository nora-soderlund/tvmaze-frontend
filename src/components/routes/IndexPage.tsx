import Page from "../page/Page";
import PageWallpaper from "../page/PageWallpaper";
import PageHeader from "../page/PageHeader";
import { Fragment, useCallback, useEffect, useState } from "react";
import TvInformationShow from "../../data/tvinformation/interfaces/TvInformationShow";
import { tvmazeDataSource } from "../../data/tvinformation";
import ShowFeature from "../shows/ShowFeature";
import PageContainer from "../page/PageContainer";
import ShowThumbnail from "../shows/ShowThumbnail";
import "./IndexPage.css";
import PageFooter from "../page/PageFooter";

const genresToFeature = [
  {
    title: "Coming soon",
    showIds: [ 5, 11447, 6, 6738, 9, 62323 ]
  },

  {
    title: "Action shows",
    showIds: [ 32, 43031, 15299, 46562, 41414, 35158 ]
  },

  {
    title: "Comedy shows",
    showIds: [ 32938, 53647, 36947, 20263, 107, 83 ]
  }
];

type GenreShow = {
  title: string;
  shows: TvInformationShow[];
};

export default function IndexPage() {
  const [ featuredShow, setFeaturedShow ] = useState<TvInformationShow | null>(null);
  const [ genreShow, setGenreShow ] = useState<GenreShow[] | null>(null);

  useEffect(() => {
    tvmazeDataSource.getShow(5).then((show) => {
      setFeaturedShow(show);
    });

    Promise.all(genresToFeature.map(async (genre) => {
      return {
        title: genre.title,
        shows: await Promise.all(genre.showIds.map((showId) => tvmazeDataSource.getShow(showId)))
      };
    })).then((results) => {
      setGenreShow(results);
    });
  }, []);

  const handleShowThumbnailClick = useCallback((show: TvInformationShow) => {
    setFeaturedShow(show);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, []);

  return (
    <Page>
      {(featuredShow?.image) && (
        <PageWallpaper image={featuredShow.image} data-testid="page-wallpaper"/>
      )}

      <PageHeader>
        {(featuredShow) && (
          <ShowFeature show={featuredShow} data-testid="show-feature"/>
        )}

        <PageContainer>
          {(genreShow)?(
            genreShow.map(({ title, shows }) => (
              <Fragment key={title}>
                <hr/>
                
                <h2>{title}</h2>

                <div className="genre-shows">
                  {shows.filter((show) => show.image?.length).map((show) => (
                    <ShowThumbnail key={show.id} show={show} onClick={() => handleShowThumbnailClick(show)}/>
                  ))}
                </div>
              </Fragment>
            ))
          ):(
            <div/>
          )}
        </PageContainer>

        <PageFooter/>
      </PageHeader>
    </Page>
  );
}
