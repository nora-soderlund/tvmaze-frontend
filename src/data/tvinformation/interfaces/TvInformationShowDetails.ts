export default interface TvInformationShowDetails {
  id: number;
  url: string;
  name: string;
  image?: string;

  information: {
    summary?: string;
    type: string;
    genres: string[];

    language: string;

    status: string;

    rating: {
      average?: number;
    };

    weight: number;
    
    site?: string;

    runtime?: number;
    averageRuntime?: number;
    
    premiered?: string;
    ended?: string;

    schedule: {
      time: string;
      days: string[];
    };
  };

  producerInformation?: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite?: string;
  };
}