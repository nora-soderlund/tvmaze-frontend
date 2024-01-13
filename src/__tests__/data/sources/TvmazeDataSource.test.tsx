import TvInformationError from "../../../data/tvinformation/interfaces/TvInformationError";
import TvmazeDataSource from "../../../data/tvinformation/sources/tvmaze/TvmazeDataSource";
import TvmazeSearchResultMock from "../../../data/tvinformation/sources/tvmaze/interfaces/TvmazeSearchResult.mock.json";
import TvInformationShowMock from "../interfaces/TvInformationShow.mock.json";

export function mockFetchResponse(ok: boolean, body: unknown) {
  jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok,
    text: async () => JSON.stringify(body)
  } as Response);
}

describe("TvmazeDataSource", () => {
  let tvInformationDataSource: TvmazeDataSource;
  let abortSignal: AbortSignal;

  beforeAll(() => {
    tvInformationDataSource = new TvmazeDataSource("https://example.com");
    abortSignal = new AbortController().signal;
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getShow", () => {
    test("Should send a GET request to /shows/{showId}", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock[0].show);

      await tvInformationDataSource.getShow(0, abortSignal);

      expect(globalThis.fetch).toHaveBeenCalledWith("https://example.com/shows/0", expect.objectContaining({
        method: "GET",
        signal: abortSignal
      }));
    });
  });

  describe("getShowsByQuery", () => {
    test("Should send a GET request to /search/shows?q={query}", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock);

      await tvInformationDataSource.getShowsByQuery("example", abortSignal);

      expect(globalThis.fetch).toHaveBeenCalledWith("https://example.com/search/shows?q=example", expect.objectContaining({
        method: "GET",
        signal: abortSignal
      }));
    });
  });

  describe("getRequest", () => {
    test("Should throw TvInformationError on non-ok responses", async () => {
      mockFetchResponse(false, undefined);

      expect(() => tvInformationDataSource.getShow(0, abortSignal)).rejects.toThrow(TvInformationError);
    });
  });

  describe("getMappedShow", () => {
    test("Should return a mapped TvInformationShow object from Show", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock[0].show);

      const result = await tvInformationDataSource.getShow(0, abortSignal);

      expect(result).toStrictEqual(TvInformationShowMock);
    });
  });
});
