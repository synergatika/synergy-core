import { moduleMetadata } from '@storybook/angular';


export default {
  title: 'Widgets/Map',

  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [],
    }),
  ],

  parameters: {

  },
};

export const MapComponentStory = () => ({
  template: `<h1>Test</h1>`,
});

MapComponentStory.story = {
  name: 'default',
};
