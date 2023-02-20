import { Observable } from 'rxjs';

import { Points, Activity, Message, LoyaltyTransaction, Statistics } from '../model';

export abstract class ILoyaltyService {

  abstract readBalance(): Observable<Points>;

  abstract readBadge(): Observable<Activity>;

  abstract readBalanceByPartner(to: string):
    Observable<Points>;

  abstract readBadgeByPartner(to: string):
    Observable<Activity>;

  abstract readTransactions(offset: string):
    Observable<LoyaltyTransaction[]>;

  abstract earnPoints(to: string, password: string, amount: number):
    Observable<Message>;

  abstract redeemPoints(to: string, password: string, points: number):
    Observable<Message>;

  abstract redeemOffer(partnerId: string, offerId: string, to: string, password: string, points: number, quantity: number):
    Observable<Message>;

  abstract readLoyaltyStatistics(_date: string):
    Observable<Statistics>;

  abstract exportLoyaltyStatistics(_date: string, _type:string): string;
    // :Observable<Statistics>;

  abstract readOfferStatistics(partner_id: string, offer_id: string, _date: string):
    Observable<Statistics>;

  abstract exportOfferStatistics(partner_id: string, offer_id: string, _date: string): string;
    // :Observable<Statistics>;
}
