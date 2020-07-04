import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeModule } from 'angularx-qrcode';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  // Card Components
  LoyaltyBadgeCardComponent,
  LoyaltyBalanceCardComponent,
  MicrocreditBadgeCardComponent,
  MicrocreditSupportCardComponent,
  MicrocreditCampaignCardComponent,
  OfferCardComponent,
  PartnerCardComponent,
  PostEventCardComponent,
  QRCodeCardComponent,

  // Layout Components
  FooterComponent,
  LanguageSwitcherComponent,
  MenuComponent,
  TabMenuComponent,
  TopbarComponent,
  UserMenuComponent,

  // List Components
  MicrocreditCampaignsListCarouselComponent,
  MicrocreditCampaignsListScrollComponent,
  MicrocreditSupportsListPaginationComponent,
  OffersListCarouselComponent,
  OffersListScrollComponent,
  PartnersListCarouselComponent,
  PartnersListScrollComponent,
  PostsEventsListCarouselComponent,
  PostsEventsListScrollComponent,

  // Single Items Components
  MicrocreditCampaignSingleComponent,
  PartnerSingleComponent,
  PostEventSingleComponent,

  // Widgets Components
  MapComponent,
  ShareIconComponent,
} from './components';

const COMPONENTS = [
  // Card Components
  LoyaltyBadgeCardComponent,
  LoyaltyBalanceCardComponent,
  MicrocreditBadgeCardComponent,
  MicrocreditCampaignCardComponent,
  MicrocreditSupportCardComponent,
  OfferCardComponent,
  PartnerCardComponent,
  PostEventCardComponent,
  QRCodeCardComponent,

  // Layout Components
  FooterComponent,
  LanguageSwitcherComponent,
  MenuComponent,
  TabMenuComponent,
  TopbarComponent,
  UserMenuComponent,

  // List Components
  MicrocreditCampaignsListCarouselComponent,
  MicrocreditCampaignsListScrollComponent,
  MicrocreditSupportsListPaginationComponent,
  OffersListCarouselComponent,
  OffersListScrollComponent,
  PartnersListCarouselComponent,
  PartnersListScrollComponent,
  PostsEventsListCarouselComponent,
  PostsEventsListScrollComponent,

  // Single Items Components
  MicrocreditCampaignSingleComponent,
  PartnerSingleComponent,
  PostEventSingleComponent,

  // Widgets Components
  ShareIconComponent,
  MapComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule,
    CarouselModule,
    MatCardModule,
    MatTooltipModule,
    NgxPaginationModule,
    NgbDropdownModule,
    QRCodeModule,
    TranslateModule,
    InfiniteScrollModule,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class SngCoreModule { }
