export interface PartnerAddress {
  street: string;
  city: string;
  postCode: string;
  coordinates: string[];
}

export interface PartnerContact {
  slug: string;
  name: string;
  value: string;
}

export interface PartnerPayment {
  bic: string;
  name: string;
  value: string;
}

export interface Partner {
  _id: string;
  email: string;

  name: string;
  imageURL: string;
  slug: string;
  subtitle?: string;
  description?: string;
  timetable?: string;
  sector: string;

  phone: string;
  contacts: PartnerContact[];
  address: PartnerAddress;
  payments: PartnerPayment[];

  createdAt?: Date;
}
