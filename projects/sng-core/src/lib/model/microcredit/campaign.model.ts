import { Partner } from '../user';

import { Statistics } from '../statistics.model';

interface Tokens {
  _id: string;
  earnedTokens: number;
  paidTokens: number;
  redeemedTokens: number;
}

export interface MicrocreditCampaign {
  _id: string;
  slug: string;
  imageURL: string;
  title: string;
  subtitle: string;
  terms: string;
  description: string;
  category: string;
  access: string;
  status: string;

  quantitative: boolean;
  redeemable: boolean;
  stepAmount: number;
  minAllowed: number;
  maxAllowed: number;
  maxAmount: number;

  redeemStarts: number;
  redeemEnds: number;
  startsAt: number;
  expiresAt: number;

  tokens: Tokens;

  statistics?: {
    earned: Statistics;
    redeemed: Statistics;
  }

  createdAt: Date;
  updatedAt: Date;

  partner: Partner;
}
