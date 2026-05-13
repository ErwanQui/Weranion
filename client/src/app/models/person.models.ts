import { Duchy } from './territory.models';

export interface PersonFilters {
  name?: string;
  duchyId?: string;
  alive?: boolean;
}

export interface Person {
  _id: string;
  name: string;
  age: number;
  duchy: Duchy;
  details: string;
  alive: boolean;
}