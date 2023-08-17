export interface FoodObject {
  _id: string,
  name: string,
  price: number,
  craft: Array<{ 
    element: string | FoodObject,
    quantity: number
  }>
}