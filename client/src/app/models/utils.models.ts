export interface SnackBarParameters {
  message: string,
  action?: string,
  duration?: number
}

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface WeranionDate {
  year: number;
  month: Month;
  eventTitle?: string
}