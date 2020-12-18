export interface MicrocreditTransaction {
  _id: string;

  member_id: string;
  partner_id: string;

  campaign_id: string;
  campaign_title: string;

  support_id: string,
  initialTokens: number,
  currentTokens: number,

  tx: string;
  type: string;

  createdAt: Date;
}
