import { Duchy } from './territory.models';
import { Id } from './utils.models';

export interface PersonFilters {
  name?: string;
  duchyId?: string;
  alive?: boolean;
}

export interface PersonSkeleton {
  name: string;
  age: number;
  duchy: Duchy;
  details: string;
  alive: boolean;
}

export interface Person extends PersonSkeleton, Id {}