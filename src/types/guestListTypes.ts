export interface Guest {
  id: string;
  name: string;
  table: number;
  seated: boolean;
}

export interface TableInfo {
  tableNumber: number;
  guests: Guest[];
  seatedCount: number;
}

export type NewGuest = Omit<Guest, "id">;
