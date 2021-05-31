import { Partner } from '../user';
import { Statistics } from '../statistics.model';

export interface LoyaltyOffer {
  _id: string;
  imageURL: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  instructions: string;
  cost: number;
  expiresAt: number;

  statistics?: Statistics;

  createdAt: Date;
  updatedAt: Date;

  partner: Partner;
}
