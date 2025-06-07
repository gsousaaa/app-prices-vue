import type { Price } from "./IGetRoomsReturn";

export interface PriceWithRoom extends Price {
    room: string
}