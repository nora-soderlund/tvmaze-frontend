import TvInformationDataSource from "../../interfaces/TvInformationDataSource";
import TvInformationError from "../../interfaces/TvInformationError";
import TvInformationShowDetails from "../../interfaces/TvInformationShowDetails";
import { SearchResult, Show } from "./interfaces/TvmazeSearchResult";

export default class TvmazeDataSource implements TvInformationDataSource {
  constructor(private readonly baseUrl: string) {

  }

  /**
   * Fetches the show details from the TVMAZE API via a TVMAZE show id.
   */
  public async getShow(showId: number, abortSignal?: AbortSignal): Promise<TvInformationShowDetails> {
    const url = new URL(`/shows/${showId}`, this.baseUrl);

    const result = await this.getRequest<Show>(url, abortSignal);

    return this.getMappedShowDetails(result);
  }

  /**
   * Fetches a list of shows by the query from the TVMAZE API.
   */
  public async getShowsByQuery(query: string, abortSignal?: AbortSignal): Promise<TvInformationShowDetails[]> {
    const url = new URL("/search/shows", this.baseUrl);

    url.searchParams.set("q", query);

    const result = await this.getRequest<SearchResult>(url, abortSignal);

    return result.map(({ show }) => this.getMappedShowDetails(show));
  }

  private async getRequest<Result>(url: URL, abortSignal?: AbortSignal): Promise<Result> {  
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      signal: abortSignal
    });

    const body = await response.text();

    if(!response.ok) {
      throw new TvInformationError("Response was not ok.", body);
    }

    return JSON.parse(body);
  }

  private getMappedShowDetails(result: Show): TvInformationShowDetails {
    return {
      id: result.id,
      url: result.url,
      name: result.name,
      image: result.image?.medium,
    
      information: {
        summary: result.summary,
        
        type: result.type,
        genres: result.genres,
    
        language: result.language,
    
        status: result.status,
    
        rating: {
          average: result.rating.average
        },
    
        weight: result.weight,
        
        site: result.officialSite,
    
        runtime: result.runtime,
        averageRuntime: result.averageRuntime,
        
        premiered: result.premiered,
        ended: result.ended,
    
        schedule: {
          time: result.schedule.time,
          days: result.schedule.days
        }
      },
    
      producerInformation: (result.network) && {
        id: result.network.id,
        name: result.network.name,
        country: result.network.country,
        officialSite: result.network.officialSite
      }
    };
  }
}
