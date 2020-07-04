import { Observable } from 'rxjs';

import { Partner } from '../model';

export abstract class IPartnersService {

  abstract readPartners(offset: string): Observable<Partner[]>;

  abstract readPartnerInfo(partnerId: string): Observable<Partner>;

  abstract updatePartnerInfo(partnerId: string, formData: FormData): Observable<Partner>;

}
