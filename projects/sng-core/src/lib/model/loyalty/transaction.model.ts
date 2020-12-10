export interface LoyaltyTransaction {
  _id: string;

  partner_id: string;
  partner_name: string;

  member_id: string;

  offer_id: string;
  offer_title?: string;
  quantity?: number;

  points: number;
  amount?: number;

  tx: string;
  type: string;

  createdAt: Date;
}
