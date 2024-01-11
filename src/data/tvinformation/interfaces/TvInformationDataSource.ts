import TvInformationShowDetails from "./TvInformationShowDetails";

export default interface TvInformationDataSource {
  getShow(showId: number, abortSignal?: AbortSignal): Promise<TvInformationShowDetails>;
  getShowsByQuery(query: string, abortSignal?: AbortSignal): Promise<TvInformationShowDetails[]>;
}
