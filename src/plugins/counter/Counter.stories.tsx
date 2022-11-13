import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';

import Counter from './Counter';
import { store } from '../../app/store';


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
