export interface Guest {
  id: string;
  name: string;
  table: number;
  seated: boolean;
}

export type NewGuest = Omit<Guest, "id">;
