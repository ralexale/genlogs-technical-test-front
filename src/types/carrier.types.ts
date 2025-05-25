export interface Carrier {
  name: string;
  trucks_per_day: number;
  id: number;
}

export interface GetCarriersRequest {
  from_city: string;
  to_city: string;
}

export type CarriersResponse = Carrier[];
