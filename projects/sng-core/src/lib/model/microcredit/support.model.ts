import { MicrocreditTransaction } from './transaction.model';
import { MicrocreditCampaign } from './campaign.model';

export enum SupportStatus {
  COMPLETED = 'completed',
  PAID = 'paid',
  UNPAID = 'unpaid'
}

export interface SupportPayment {
  _id: string;
  method: {
    bic: string,
    name: string,
    value: string
  };
}

export interface MicrocreditSupport {

_id: string;

  campaign: MicrocreditCampaign;

  payment: SupportPayment
  // support_id: string;
  // payment_id: string;

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
