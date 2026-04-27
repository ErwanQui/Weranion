export interface WeranionHistory {
  _id: string,
  year: number,
  month: number,
  title: string,
  details: string,
  events: WeranionEvent[]
}

export interface WeranionEvent {
  title: string,
  details: string,
}