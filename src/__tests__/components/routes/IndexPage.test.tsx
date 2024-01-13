import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import IndexPage from "../../../components/routes/IndexPage";
import TvmazeDataSource from "../../../data/tvinformation/sources/tvmaze/TvmazeDataSource";
import TvInformationShowMock from "../../data/interfaces/TvInformationShow.mock.json";
import { act } from "react-dom/test-utils";
import ShowFeature, { ShowFeatureProps } from "../../../components/shows/ShowFeature";
import { ReactElement } from "react";

describe("IndexPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should show a page wallpaper if the feature show has an image", async () => {
    jest.spyOn(TvmazeDataSource.prototype, "getShow").mockResolvedValue(TvInformationShowMock);

    render(<IndexPage/>);

    await waitFor(() => expect(screen.getByTestId("show-feature")).toBeInTheDocument());

    const pageWallpaper = screen.getByTestId("page-wallpaper");
    expect(pageWallpaper).toBeInTheDocument();
  });

  test("Should change the feature show when a show is clicked", async () => {
    jest.spyOn(TvmazeDataSource.prototype, "getShow").mockResolvedValue(TvInformationShowMock);

    render(<IndexPage/>);
    
    await waitFor(() => expect(screen.getAllByTestId("genre-show-thumbnail")[0]).toBeInTheDocument());

    await act(async () => {
      const showThumbnail = screen.getAllByTestId("genre-show-thumbnail")[0];

      fireEvent.click(showThumbnail);
    });
  });
});