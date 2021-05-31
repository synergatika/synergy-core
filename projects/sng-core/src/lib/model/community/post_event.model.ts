import { Partner } from "../user";

export interface PostEvent {
  _id: string;
  imageURL: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  dateTime: number;
  location: string;
  access: string;

  type: string;
  createdAt: string;
  updatedAt: string;

  partner: Partner;
}
