import { Observable } from 'rxjs';

import {
  Offer,
  Event,
  Message,
  Post,
  MicrocreditCampaign,
  PostEvent
} from '../model';

export abstract class IItemsService {

  abstract readAllOffers(offset: string): Observable<Offer[]>;

  abstract readOffersByStore(partnerId: string, offset: string): Observable<Offer[]>;

  abstract createOffer(formData: FormData): Observable<Message>;

  abstract editOffer(partnerId: string, offerId: string, formData: FormData): Observable<Message>;

  abstract readOffer(partnerId: string, offerId: string): Observable<Offer>;

  abstract deleteOffer(partnerId: string, offerId: string): Observable<Offer>;

  /**
   * Events
   */
  abstract readAllPrivateEvents(offset: string): Observable<Event[]>;

  abstract readPrivateEventsByStore(partnerId: string, offset: string): Observable<Event[]>;

  abstract createEvent(formData: FormData): Observable<Message>;

  abstract readEvent(partnerId: string, postId: string): Observable<Event>;

  abstract editEvent(partnerId: string, eventId: string, formData: FormData): Observable<Message>;

  abstract deleteEvent(partnerId: string, eventId: string): Observable<Offer>;

  /**
   * Posts
   */
  abstract readAllPrivatePosts(offset: string): Observable<Post[]>;

  abstract readPrivatePostsByStore(partnerId: string, offset: string): Observable<Post[]>;

  abstract createPost(formData: FormData): Observable<Message[]>;

  abstract readPost(partnerId: string, postId: string): Observable<Post>;

  abstract editPost(partnerId: string, postId: string, formData: FormData): Observable<Message>;

  abstract deletePost(partnerId: string, postId: string): Observable<Offer>;

  /**
   * Posts & Events
   */
  abstract readAllPrivatePostsEvents(offset: string): Observable<PostEvent[]>;

  abstract readPrivatePostsEventsByStore(partnerId: string, offset: string): Observable<PostEvent[]>;

  /**
   * Microcredit Campaigns
   */
  abstract readAllPrivateMicrocreditCampaigns(offset: string): Observable<MicrocreditCampaign[]>;

  abstract readPrivateMicrocreditCampaignsByStore(partnerId: string, offset: string): Observable<MicrocreditCampaign[]>;

  abstract oneClickCreateMicrocreditCampaign(formData: FormData, token: string): Observable<Message>;

  abstract createMicrocreditCampaign(formData: FormData): Observable<MicrocreditCampaign>;

  abstract editCampaign(partnerId: string, campaignId: string, formData: FormData): Observable<Message>;

  abstract publishCampaign(partnerId: string, campaignId: string, formData: FormData): Observable<Message>;

  abstract readCampaign(partnerId: string, campaignId: string): Observable<MicrocreditCampaign>;

  abstract deleteCampaign(partnerId: string, campaignId: string): Observable<Message>;
}
