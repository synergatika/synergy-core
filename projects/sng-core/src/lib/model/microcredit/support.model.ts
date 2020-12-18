import {
  PartnerAddress,
  PartnerPayment,
  PartnerContact
} from '../partner';

import { MicrocreditTransaction } from './transaction.model';
import { MicrocreditCampaign } from './campaign.model';

export interface MicrocreditSupport {
  // partner_id: string;
  // partner_name: string;
  //
  // partner_address: PartnerAddress;
  // partner_payments: PartnerPayment[];
  // partner_contacts: PartnerContact[];
  //
  // campaign_id: string;
  // campaign_imageURL: string;
  // title: string;
  // terms: string;
  // redeemStarts: number;
  // redeemEnds: number;

  campaign: MicrocreditCampaign;
  support_id: string;
  payment_id: string;

  initialTokens: number;
  currentTokens: number;

  status: string;
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
