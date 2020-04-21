import React, { useEffect } from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import selectQuery from '../../selectors/selectQuery';
import selectDetails from '../../selectors/selectDetails';
import openDrawer from '../../actions/openDrawer';
import fetchNextPage from '../../actions/fetchNextPage';
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
  const query = useSelector(selectQuery);
  const details = useSelector(selectDetails);

  useEffect(() => {
    if (query.statusText === null && query.results.length === 0) {
      const action = fetchNextPage();
      dispatch(action);
    }
  }, [query.statusText, query.results.length, dispatch]);

  useEffect(() => {
    if (!query.isFetching && (query.nextPage === 2 || query.nextPage === null)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query]);

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
            {query.results.length === 0
              ? query.statusText
              : query.results.map((result, index) => (
                <MixListItem
                  key={`result-${index}`}
                  detailsInDrawer={widthMatch < 3}
                  {...result}
                />
              ))}
            {!query.isFetching && <button onClick={() => dispatch(fetchNextPage())}>Test fetch next page</button>}
          </div>
          <Aside drawer={widthMatch < 3 ? RESULT_DETAILS_DRAWER : undefined}>
            {details
              ? <MixDetails {...details} />
              : <MixDetails empty />}
          </Aside>
        </div>
      )}
    />
  );
};

export default Home;
