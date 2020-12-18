import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  MicrocreditCampaignLittleCardComponent,
  OfferCardComponent,
  OfferLittleCardComponent,
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
  LoyaltyOfferSingleComponent,
  PartnerSingleComponent,
  PostEventSingleComponent,

  // Statistics Components
  OfferStatisticsComponent,
  LoyaltyStatisticsComponent,
  MicrocreditCampaignStatisticsComponent,

  // Widgets Components
  MapComponent,
  ShareIconComponent,
} from './components';

import { ContentTranslatePipe } from './pipes';

const COMPONENTS = [
  // Card Components
  LoyaltyBadgeCardComponent,
  LoyaltyBalanceCardComponent,
  MicrocreditBadgeCardComponent,
  MicrocreditCampaignCardComponent,
  MicrocreditCampaignLittleCardComponent,
  MicrocreditSupportCardComponent,
  OfferCardComponent,
  OfferLittleCardComponent,
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
  LoyaltyOfferSingleComponent,
  PartnerSingleComponent,
  PostEventSingleComponent,

  // Statistics Components
  OfferStatisticsComponent,
  LoyaltyStatisticsComponent,
  MicrocreditCampaignStatisticsComponent,

  // Widgets Components
  ShareIconComponent,
  MapComponent,
];

@NgModule({
  declarations: [
    ContentTranslatePipe, ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AgmCoreModule,
    CarouselModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxPaginationModule,
    NgbDropdownModule,
    QRCodeModule,
    TranslateModule,
    InfiniteScrollModule,
  ],
  exports: [
    ContentTranslatePipe, ...COMPONENTS,
  ]
})
export class SngCoreModule { }
