export interface WeranionHistory {
  _id: string,
  year: number,
  month: number,
  title: string,
  details: string,
  events: [{
    title: string,
    details: string,
  }]
}