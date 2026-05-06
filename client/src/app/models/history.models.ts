export interface WeranionHistoryData {
  title: string,
  details: string
}

export type WeranionHistory = WeranionHistoryData & {
  _id?: string,
  year: number,
  month: number,
  events: WeranionEvent[]
}

export interface WeranionEvent {
  _id?: string,
  title: string,
  details: string,
}