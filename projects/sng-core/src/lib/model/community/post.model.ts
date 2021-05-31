import { Partner } from "../user";

export interface Post {
  _id: string;
  slug: string;
  imageURL: string;
  title: string;
  subtitle: string;
  description: string;
  contentFiles: string[];
  access: string;

  createdAt: string;
  updatedAt: string;

  partner: Partner;
}
