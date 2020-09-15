import { PartnerAddress } from './partner/address.model';
import { Statistics } from './statistics.model';

export interface Offer {
  partner_id: string;
  partner_name: string;
  partner_slug: string;
  partner_imageURL: string;
  partner_address: PartnerAddress;

  offer_id: string;
  offer_imageURL: string;
  offer_slug: string;
  title: string;
  subtitle: string;
  description: string;
  cost: number;

  statistics?: Statistics;

  expiresAt: number;
  createdAt: string;
}
