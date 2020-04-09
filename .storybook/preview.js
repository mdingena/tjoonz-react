import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import StoreProvider from '../src/providers/StoreProvider';
import ResizeObserverProvider from '../src/providers/ResizeObserverProvider';
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css';

addDecorator(storyFn => <StoreProvider>{storyFn()}</StoreProvider>);
addDecorator(storyFn => <ResizeObserverProvider>{storyFn()}</ResizeObserverProvider>);
addDecorator(storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>);

addParameters({
  options: {
    theme: themes.dark
  }
});
