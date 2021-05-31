import { MicrocreditTransaction } from './transaction.model';
import { MicrocreditCampaign } from './campaign.model';

export enum SupportStatus {
  COMPLETED = 'completed',
  PAID = 'paid',
  UNPAID = 'unpaid'
}

export interface MicrocreditSupport {

  campaign: MicrocreditCampaign;
  support_id: string;
  payment_id: string;

  initialTokens: number;
  currentTokens: number;

  status: SupportStatus;
  type: string;
  amount: number;
  method: string;

  transactions: MicrocreditTransaction[];
  createdAt: Date;
  how: {
    title: string,
    value: string
  };
}
