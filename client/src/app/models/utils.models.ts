import { ComponentType } from '@angular/cdk/overlay';

export interface SnackBarParameters {
  message: string;
  action?: string;
  duration?: number;
}

export interface DialogParameters<T, S> {
  component: ComponentType<T>;
  width?: string;
  data?: S;
}

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface WeranionDate {
  year: number;
  month: Month;
  eventTitle?: string
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Id {
  _id: string
}