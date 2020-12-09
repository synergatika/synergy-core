import { PartnerAddress } from './address.model';
import { PartnerContact } from './contact.model';
import { PartnerPayment } from './payment.model';

export interface Partner {
  _id?: string;
  email?: string;

  name: string;
  imageURL: string;
  slug?: string;
  subtitle?: string;
  description?: string;
  timetable?: string;
  sector: string;

  phone: string;
  contacts: PartnerContact[];
  address: PartnerAddress;
  payments?: PartnerPayment[];

  createdAt?: Date;
}
