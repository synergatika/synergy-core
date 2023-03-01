import { MicrocreditTransaction } from './transaction.model';
import { MicrocreditCampaign } from './campaign.model';
import { Member } from '../user/member.model';

export enum MicrocreditSupportStatus {
  COMPLETED = 'completed',
  PAID = 'paid',
  UNPAID = 'unpaid'
}

export interface MicrocreditSupportPayment {
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
  member: Member;

  payment: MicrocreditSupportPayment;
  // support_id: string;
  // payment_id: string;

  initialTokens: number;
  currentTokens: number;

  status: MicrocreditSupportStatus;
  type: string;
  amount: number;
  method: string;

  // transactions: MicrocreditTransaction[];
  createdAt: Date;
  how: {
    title: string,
    value: string
  };
}
