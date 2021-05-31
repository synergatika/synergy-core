import { Partner } from "../user";

export interface Event {
  _id: string;
  imageURL: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  dateTime: number;
  location: string;
  access: string;

  createdAt: string;
  updatedAt: string;

  partner: Partner;
}
