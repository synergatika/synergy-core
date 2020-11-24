import { PartnerAddress } from './address.model';
import { PartnerContact } from './contact.model';
import { PartnerContacts } from './contacts.model';
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

  contact: PartnerContact;
  contacts?: PartnerContacts[];
  address: PartnerAddress;
  payments?: PartnerPayment[];

  createdAt?: Date;
}
