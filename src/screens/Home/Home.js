import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import openDrawer from '../../actions/openDrawer';
import { SEARCH_DRAWER, RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import { ARTISTS, GENRES, TAGS } from '../../constants/facettedSearchFacets';
import Aside from '../../components/Aside';
import Icon from '../../components/Icon';
import FacettedSearch from '../../components/FacettedSearch';
import Button from '../../components/Button';
import MixListItem from '../../components/MixListItem';
import MixDetails from '../../components/MixDetails';
import styles from './Home.module.css';

const columns = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns
};

const Home = () => {
  const dispatch = useDispatch();
  const drawer = useSelector(selectDrawer);

  const handleOpenDrawer = () => {
    const action = openDrawer(SEARCH_DRAWER);
    dispatch(action);
  };

  return (
    <Observe
      box='content-box'
      breakpoints={{
        box: 'content-box',
        widths: {
          0: 1,
          620: 2,
          1024: 3
        }
      }}
      render={({ observedElementProps, widthMatch = styles.oneColumn }) => (
        <div {...observedElementProps} className={columns[widthMatch]}>
          <Aside drawer={widthMatch < 2 ? SEARCH_DRAWER : undefined}>
            <div className={styles.search}>
              <FacettedSearch facet={ARTISTS} showCombobox />
              <FacettedSearch facet={TAGS} showCombobox />
              <FacettedSearch facet={GENRES} previewCount={10} />
            </div>
          </Aside>
          <div className={styles.results}>
            {widthMatch < 2 && (
              <div className={styles.searchButton}>
                <Button
                  onClick={handleOpenDrawer}
                  text='Search options'
                  Icon={Icon.Tasks}
                  disabled={drawer !== null}
                />
              </div>
            )}
            <MixListItem
              slug='ill-ektro-bassnectar-mixtape-title'
              thumbnail='https://via.placeholder.com/68x68'
              title='Mixtape title'
              artists='ill Ektro, Bassnectar'
              labels='Fidget House, Dubstep, Shambhala'
              published='2020-04-20'
            />
            <MixListItem
              slug='ill-ektro-bassnectar-mixtape-title'
              thumbnail='https://via.placeholder.com/68x68'
              title='Mixtape title'
              artists='ill Ektro, Bassnectar'
              labels='Fidget House, Dubstep, Shambhala'
              published='2020-04-20'
            />
            <MixListItem
              slug='ill-ektro-bassnectar-mixtape-title'
              thumbnail='https://via.placeholder.com/68x68'
              title='Mixtape title'
              artists='ill Ektro, Bassnectar'
              labels='Fidget House, Dubstep, Shambhala'
              published='2020-04-20'
            />
            <MixListItem
              slug='ill-ektro-bassnectar-mixtape-title'
              thumbnail='https://via.placeholder.com/68x68'
              title='Mixtape title'
              artists='ill Ektro, Bassnectar'
              labels='Fidget House, Dubstep, Shambhala'
              published='2020-04-20'
            />
          </div>
          <Aside drawer={widthMatch < 3 ? RESULT_DETAILS_DRAWER : undefined}>
            <MixDetails
              slug='ill-ektro-bassnectar-mixtape-title'
              thumbnail='https://www.tjoonz.com/wp-content/uploads/Excision-Shambhala-2012-Dubstep-Mix-54x54.jpg'
              poster='https://www.tjoonz.com/wp-content/uploads/Excision-Shambhala-2012-Dubstep-Mix.jpg'
              published='2020-04-20'
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
          </Aside>
        </div>
      )}
    />
  );
};

export default Home;
