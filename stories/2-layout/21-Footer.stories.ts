import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { moduleMetadata } from '@storybook/angular';

import {
  SngCoreModule,
  ITranslationService,
} from 'sng-core';

import { provider } from '../services/dependency.helper';
import { Component } from '@angular/core';

@Component({
  selector: 'sng-footer-test',
  template: `<sng-footer></sng-footer>`
})
class FooterTestComponent {
  constructor(public translateService: ITranslationService) { }
}

export default {
  title: 'Layout/Footer',

  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        SngCoreModule
      ],
      declarations: [FooterTestComponent],
      providers: [
        ...provider,
      ],
    }),
  ],

  parameters: {

  },
};

export const FooterComponentStory = () => ({
  template: `<sng-footer-test></sng-footer-test>`,
});

FooterComponentStory.story = {
  name: 'default',
};
