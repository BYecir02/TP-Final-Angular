export interface ForecastDay {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface ForecastEntry {
  dt_txt?: string;
  main?: {
    temp?: number;
  };
  weather?: Array<{
    description?: string;
    icon?: string;
  }>;
}

export interface ForecastResponse {
  list?: ForecastEntry[];
}
