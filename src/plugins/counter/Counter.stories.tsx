import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import Counter from './Counter';


export default {
  title: 'plugins/Counter',
  component: Counter,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Counter>;


const TEMPLATE: ComponentStory<typeof Counter> = () => <Provider store={store}><Counter/></Provider>;


export let StoryCounter = TEMPLATE.bind({});
StoryCounter.args = {};
