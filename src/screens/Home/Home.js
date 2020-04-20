import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import openDrawer from '../../actions/openDrawer';
import { SEARCH_DRAWER } from '../../constants/drawers';
import { ARTISTS, GENRES, TAGS } from '../../constants/facettedSearchFacets';
import Aside from '../../components/Aside';
import Icon from '../../components/Icon';
import FacettedSearch from '../../components/FacettedSearch';
import Button from '../../components/Button';
import MixListItem from '../../components/MixListItem';
import styles from './Home.module.css';

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
          0: styles.oneColumn,
          620: styles.twoColumns,
          1024: styles.threeColumns
        }
      }}
      render={({ observedElementProps, widthMatch = styles.oneColumn }) => (
        <div {...observedElementProps} className={widthMatch}>
          <Aside drawer={widthMatch === styles.oneColumn ? SEARCH_DRAWER : undefined}>
            <FacettedSearch facet={ARTISTS} showCombobox />
            <FacettedSearch facet={TAGS} showCombobox />
            <FacettedSearch facet={GENRES} previewCount={10} />
          </Aside>
          <div className={styles.results}>
            {widthMatch === styles.oneColumn && (
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
          {widthMatch === styles.threeColumns && (
            <div className={styles.details}>
              Details
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Home;
