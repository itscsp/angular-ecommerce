export interface product {
    id: number,
    title: string,
    price: number,
    description: string
    category: string
    image: string
    rating: {
      rate: number,
      count: number
    }
    
}

export interface cartProduct {
  id: number,
  title: string,
  price: number,
  description: string
  category: string
  image: string
  rating: {
    rate: number,
    count: number
  }
  quantity: number

}