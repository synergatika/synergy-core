export interface Statistics {
  _id: string;
  count: number;
  users: number;
  usersArray?: string[];

  tokens?: number;
  amount?: number;
  points?: number;
  quantity?: number;

  byDate?: Statistics[];
  date?: string;
}
