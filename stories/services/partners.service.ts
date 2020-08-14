import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const partner = {
  data: {
    slug: "lacadona",
    sector: "Food",
    _id: "5eeb39af568ce3cbc3b26fc5",
    email: "info@lacandona.gr",
    name: "Lacadona",
    description: "Παντωπολείο",
    subtitle: "Συνεργατικό Παντωπολείο",
    imageURL: "https://api.synergatika.gr/assets/profile/5e111575eb6f66426d8794b6_1592474031553",
    address: {
      coordinates: ["37.9742903", "23.7317143"],
      street: "Ιπίττου 4",
      city: "Αθήνα",
      postCode: "10557"
    },
    timetable: "09:00-21:00",
    contact: {
      phone: "2110125653",
      websiteURL: ""
    },
    payments: [
      {
        bic: "ETHNGRAA",
        name: "NationalBankofGreece",
        value: "GR41213213131"
      }
    ],
    createdAt: "2020-06-18T09:53:51.647Z"
  },
  code: 200
};

import {
  Partner,
  IPartnersService,
} from 'sng-core';

@Injectable({
  providedIn: 'root'
})
export class PartnersService extends IPartnersService {
  readPartnerInfo(partnerId: string): Observable<Partner> {

    return of(partner.data);
  }
}
