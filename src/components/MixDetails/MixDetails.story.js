import React from 'react';
import MixDetails from './MixDetails';

export default {
  title: 'MixDetails',
  component: MixDetails
};

export const details = () => (
  <MixDetails
    slug='ill-ektro-bassnectar-mixtape-title'
    published='2020-04-20'
    poster='https://via.placeholder.com/600x600'
    title='Mixtape title'
    artists='ill Ektro, Bassnectar, Landerz, Something Else'
    genres='Fidget House, Dubstep'
    tags='Shambhala'
    duration='1:20:31'
    description="Finally it's here: Excision's Shambhala 2012 Dubstep Mix. Full tracklist, artwork and mp3 download available here! Get ready for an elevated existence!"
    plays={2255}
    downloads={542}
    bitrate={320}
    filesize={185}
  />
);
