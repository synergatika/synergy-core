import {
  PartnerAddress,
  PartnerContact,
  PartnerPayment
} from './partner';

import { Statistics } from './statistics.model';

export interface Offer {
  partner_id: string;
  partner_name: string;
  partner_email: string;
  partner_slug: string;
  partner_imageURL: string;

  partner_payments: PartnerPayment[];
  partner_address: PartnerAddress;
  partner_contacts: PartnerContact[];
  partner_phone: string;

  offer_id: string;
  offer_imageURL: string;
  offer_slug: string;
  title: string;
  subtitle: string;
  description: string;
  instructions: string;
  cost: number;

  statistics?: Statistics;

  expiresAt: number;
  createdAt: string;
}
