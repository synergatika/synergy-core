import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
  RichEditorCreateComponent,
  RichEditorViewComponent,
  ImageUploadComponent,
} from './components';

import { ContentTranslatePipe, SectorFilterPipe, SupportPaymentPipe, CampaignStatusPipe } from './pipes';
import { IStaticContentService } from './services';

const PIPES = [
  ContentTranslatePipe,
  SectorFilterPipe,
  SupportPaymentPipe,
  CampaignStatusPipe
];

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
  RichEditorCreateComponent,
  RichEditorViewComponent,
  ImageUploadComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule,
    CKEditorModule,
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
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...PIPES, ...COMPONENTS,
  ],
  providers: [
    {
			provide: APP_INITIALIZER, useFactory: contentProviderFactory, deps: [IStaticContentService], multi: true
		},
		{
			provide: APP_INITIALIZER, useFactory: sectorProviderFactory, deps: [IStaticContentService], multi: true
		},
  ]
})
export class SngCoreModule { }

export function contentProviderFactory(provider: IStaticContentService) {
	console.log("Call Provider")
	return () => provider.readContent();
}

export function sectorProviderFactory(provider: IStaticContentService) {
	console.log("Call Provider")
	return () => provider.readSectors();
}
