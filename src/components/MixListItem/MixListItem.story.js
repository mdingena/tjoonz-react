import React from 'react';
import MixListItem from './MixListItem';

export default {
  title: 'MixListItem',
  component: MixListItem
};

export const item = () => (
  <MixListItem
    slug='ill-ektro-bassnectar-mixtape-title'
    thumbnail='https://via.placeholder.com/68x68'
    title='Mixtape title'
    artists='ill Ektro, Bassnectar'
    labels='Fidget House, Dubstep, Shambhala'
    published='2020-04-20'
  />
);
