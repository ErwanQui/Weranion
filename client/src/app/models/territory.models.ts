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
  duchy: Duchy;
}

export interface Duchy {
  _id: string;
  name: string;
  details: string;
  barony: Barony;
  cities: City[];
}

export interface Barony {
  _id: string;
  name: string;
  details: string;
  duchies: Duchy[];
}
