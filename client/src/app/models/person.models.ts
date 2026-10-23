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

export const PERSON_KEYS: (keyof PersonSkeleton)[] = ['name', 'age', 'duchy', 'details', 'alive'];

export interface Person extends PersonSkeleton, Id {}