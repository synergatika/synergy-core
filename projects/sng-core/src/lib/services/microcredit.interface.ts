import { Observable } from 'rxjs';

import { Activity, MicrocreditSupport, PaymentDetails, MicrocreditTransaction, Message, Statistics } from '../model';

export abstract class IMicrocreditService {

  abstract readBadge():
    Observable<Activity>;

  abstract readAllBackerSupports(offset: string):
    Observable<MicrocreditSupport[]>;

  abstract readAllSupportsByMicrocreditCampaign(partnerId: string, campaignId: string):
    Observable<MicrocreditSupport[]>;

  abstract readBackerSupportsByMicrocreditCampaign(partnerId: string, campaignId: string, identifier: string):
    Observable<MicrocreditSupport[]>;

  abstract confirmPayment(partnerId: string, campaignId: string, supportId: string):
    Observable<PaymentDetails>;

  abstract readTransactions(offset: string):
    Observable<MicrocreditTransaction[]>;

  abstract earnTokens(partnerId: string, campaignId: string, amount: number, method: string, paid: boolean):
    Observable<PaymentDetails>;

  abstract earnTokensByPartner(partnerId: string, campaignId: string, identifier: string, amount: number, method: string, paid: boolean):
    Observable<PaymentDetails>;

  abstract redeemTokens(partnerId: string, campaignId: string, to: string, tokens: number, password: string, supportId: string):
    Observable<Message>;

  abstract readCampaignStatistics(partner_id: string, offer_id: string, _date: string):
    Observable<Statistics>;

  abstract exportCampaignStatistics(partner_id: string, offer_id: string, _date: string): string;
    // :Observable<Statistics>;

}
