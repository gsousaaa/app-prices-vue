export type IGetRoomsReturn = Room[]

export interface Room {
  id: number
  name: string
  type: string
  created_at: string
  updated_at: any
  company_id: number
  prices: Price[]
}

export interface Price {
  id: number
  room_id: number
  price: string
  effective_date: string
  created_at: string
  updated_at?: string
}
