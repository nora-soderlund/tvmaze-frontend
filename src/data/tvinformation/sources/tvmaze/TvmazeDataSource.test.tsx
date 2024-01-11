import TvInformationError from "../../interfaces/TvInformationError";
import TvmazeDataSource from "./TvmazeDataSource";
import TvmazeSearchResultMock from "./interfaces/TvmazeSearchResult.mock.json";
import TvInformationShowDetailsMock from "../../interfaces/TvInformationShowDetails.mock.json";

export function mockFetchResponse(ok: boolean, body: unknown) {
  jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok,
    text: async () => JSON.stringify(body)
  } as Response);
}

describe("TvmazeDataSource", () => {
  let tvmazeDataSource: TvmazeDataSource;
  let abortSignal: AbortSignal;

  beforeAll(() => {
    tvmazeDataSource = new TvmazeDataSource("https://example.com");
    abortSignal = new AbortController().signal;
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getShow", () => {
    test("Should send a GET request to /shows/{showId}", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock[0].show);

      await tvmazeDataSource.getShow(0, abortSignal);

      expect(globalThis.fetch).toHaveBeenCalledWith("https://example.com/shows/0", expect.objectContaining({
        method: "GET",
        signal: abortSignal
      }));
    });
  });

  describe("getShowsByQuery", () => {
    test("Should send a GET request to /search/shows?q={query}", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock);

      await tvmazeDataSource.getShowsByQuery("example", abortSignal);

      expect(globalThis.fetch).toHaveBeenCalledWith("https://example.com/search/shows?q=example", expect.objectContaining({
        method: "GET",
        signal: abortSignal
      }));
    });
  });

  describe("getRequest", () => {
    test("Should throw TvInformationError on non-ok responses", async () => {
      mockFetchResponse(false, undefined);

      expect(() => tvmazeDataSource.getShow(0, abortSignal)).rejects.toThrow(TvInformationError);
    });
  });

  describe("getMappedShowDetails", () => {
    test("Should return a mapped TvInformationShowDetails object from Show", async () => {
      mockFetchResponse(true, TvmazeSearchResultMock[0].show);

      const result = await tvmazeDataSource.getShow(0, abortSignal);

      expect(result).toStrictEqual(TvInformationShowDetailsMock);
    });
  });
});
