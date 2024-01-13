import TvInformationShow from "./TvInformationShow";

export default interface TvInformationDataSource {
  getShow(showId: number, abortSignal?: AbortSignal): Promise<TvInformationShow>;
  getShowsByQuery(query: string, abortSignal?: AbortSignal): Promise<TvInformationShow[]>;
}
