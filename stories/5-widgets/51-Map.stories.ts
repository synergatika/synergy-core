import { AgmCoreModule } from '@agm/core';

import { moduleMetadata } from '@storybook/angular';

import {
  SngCoreModule,
  IStaticDataService,
  IPartnersService,
  IEnvironmentService,
} from 'sng-core';

import { environment } from '../services/environment';
import { PartnersService } from '../services/partners.service';
import { StaticDataService } from '../services/static-data.service';

export default {
  title: 'Widgets/Map',

  decorators: [
    moduleMetadata({
      imports: [
        SngCoreModule,
        AgmCoreModule.forRoot({
          apiKey: `${environment.mapApiKey}`
        }),
      ],
      declarations: [],
      providers: [
        { provide: IStaticDataService, useClass: StaticDataService },
        { provide: IPartnersService, useClass: PartnersService },
        { provide: IEnvironmentService, useValue: environment },
      ],
    }),
  ],

  parameters: {

  },
};

export const MapComponentStory = () => ({
  template: `<sng-map></sng-map>`,
});

MapComponentStory.story = {
  name: 'default',
};
