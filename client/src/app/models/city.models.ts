export interface CityFilters {
  name?: string;
  duchyId?: string;
  baronyId?: string;
}

export interface DuchyFilters {
  name?: string;
  baronyId?: string;
}

export interface BaronyFilters {
  name?: string;
}

export interface City {
  _id: string;
  name: string;
  details: string;
  duchyId: string;
}

export interface Duchy {
  _id: string;
  name: string;
  details: string;
  baronyId: string;
}

export interface Barony {
  _id: string;
  name: string;
  details: string;
}
