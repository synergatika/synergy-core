import { Observable } from 'rxjs';

import { Points, Activity, Message, LoyaltyTransaction } from '../model';

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
}
