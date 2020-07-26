import React from 'react';
import { Provider } from 'react-redux';
import { debounce } from '../utils';
import store from '../store';
import facettedSearchSubscriber from '../subscribers/facettedSearchSubscriber';

store.subscribe(debounce(facettedSearchSubscriber, 1000));

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

export default StoreProvider;
