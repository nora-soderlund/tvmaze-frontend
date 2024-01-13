import { render, screen, waitFor } from "@testing-library/react";
import IndexPage from "../../../components/routes/IndexPage";
import TvmazeDataSource from "../../../data/tvinformation/sources/tvmaze/TvmazeDataSource";
import TvInformationShowDetailsMock from "../../data/interfaces/TvInformationShowDetails.mock.json";

describe("IndexPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should enable the search visibility on click", () => {
    render(<IndexPage/>);
  });

  test("Should show a page wallpaper if the feature show has an image", async () => {
    jest.spyOn(TvmazeDataSource.prototype, "getShow").mockResolvedValue(TvInformationShowDetailsMock);

    render(<IndexPage/>);

    await waitFor(() => expect(screen.getByTestId("show-feature")).toBeInTheDocument());

    const pageWallpaper = screen.getByTestId("page-wallpaper");
    expect(pageWallpaper).toBeInTheDocument();
  });
});