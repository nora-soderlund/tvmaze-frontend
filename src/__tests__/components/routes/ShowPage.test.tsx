import { render, screen, waitFor } from "@testing-library/react";
import ShowPage, { getParsedShowId } from "../../../components/routes/shows/ShowPage";
import TvmazeDataSource from "../../../data/tvinformation/sources/tvmaze/TvmazeDataSource";
import TvInformationShowMock from "../../data/interfaces/TvInformationShow.mock.json";
import { tvInformationDataSource } from "../../../data/tvinformation";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ShowPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getParsedShowId", () => {
    test("Should return null for a non-integer", () => {
      expect(getParsedShowId("abc")).toBe(null);
    });

    test("Should return null for undefined", () => {
      expect(getParsedShowId(undefined)).toBe(null);
    });
  });

  test("Should show the feature show", async () => {
    jest.spyOn(tvInformationDataSource, "getShow").mockResolvedValue(TvInformationShowMock);

    render(
      <MemoryRouter initialEntries={["/shows/8"]}>
        <Routes>
          <Route path="shows/:showId" element={<ShowPage/>}/>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId("show-feature")).toBeInTheDocument());
  });

  test("Should show an error if showId is invalid", async () => {
    render(
      <MemoryRouter initialEntries={["/shows/abc"]}>
        <Routes>
          <Route path="shows/:showId" element={<ShowPage/>}/>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
  });

  test("Should show an error if the show was not fetched", async () => {
    jest.spyOn(tvInformationDataSource, "getShow").mockRejectedValue("");

    render(
      <MemoryRouter initialEntries={["/shows/1"]}>
        <Routes>
          <Route path="shows/:showId" element={<ShowPage/>}/>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
  });
});