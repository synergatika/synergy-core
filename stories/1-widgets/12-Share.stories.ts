import { moduleMetadata } from '@storybook/angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SngCoreModule,
  ShareIconComponent,
} from 'sng-core';


export default {
  title: 'Widgets/ShareIcon',

  decorators: [
    moduleMetadata({
      imports: [
        SngCoreModule,
        NgbDropdownModule,
      ],
      declarations: [],
      providers: [],
    }),
  ],

  parameters: {

  },

  component: ShareIconComponent,
};

export const ShareIconComponentStory = () => ({
  template: `<sng-share-icon></sng-share-icon>`,
  styleUrls: ['../styles/variables.css']
});

ShareIconComponentStory.story = {
  name: 'default',
};
