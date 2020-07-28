import React, { useRef, useEffect } from 'react';
import { Observe, useBreakpoints } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import selectQuery from '../../selectors/selectQuery';
import selectDetails from '../../selectors/selectDetails';
import openDrawer from '../../actions/openDrawer';
import fetchNextPage from '../../actions/fetchNextPage';
import updateQuery from '../../actions/updateQuery';
import { SEARCH_DRAWER, RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import { ARTISTS, GENRES, TAGS } from '../../constants/facettedSearchFacets';
import Aside from '../../components/Aside';
import Icon from '../../components/Icon';
import FacettedSearchCombobox from '../../components/FacettedSearchCombobox';
import FacettedSearchList from '../../components/FacettedSearchList';
import Button from '../../components/Button';
import MixListHeader from '../../components/MixListHeader';
import MixListItem from '../../components/MixListItem';
import MixDetails from '../../components/MixDetails';
import styles from './Home.module.css';

const grid = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns
};

const Home = () => {
  const queryHasUpdated = useRef(false);
  const dispatch = useDispatch();
  const drawer = useSelector(selectDrawer);
  const query = useSelector(selectQuery);
  const details = useSelector(selectDetails);

  useEffect(() => {
    if (!query.isFetching && query.statusText === null) {
      let action;

      if (query.results.length === 0) {
        action = fetchNextPage();
      } else if (query.results.length === 1 && !queryHasUpdated.current) {
        queryHasUpdated.current = true;
        action = updateQuery();
      }

      if (action) {
        dispatch(action);
      }
    }
  }, [query, dispatch]);

  useEffect(() => {
    const fetchError = query.statusText !== null;
    const isNewQuery = query.nextPage === 2;
    if (!query.isFetching && !fetchError && isNewQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [query]);

  const handleOpenDrawer = () => {
    const action = openDrawer(SEARCH_DRAWER);
    dispatch(action);
  };

  const [columns = 1] = useBreakpoints({
    box: 'content-box',
    widths: {
      0: 1,
      621: 2,
      1025: 3
    }
  });

  if (!columns) return null;

  return (
    <div className={grid[columns]}>
      <Aside drawer={columns < 2 ? SEARCH_DRAWER : undefined}>
        <div className={styles.search}>
          <FacettedSearchCombobox facet={ARTISTS} />
          <FacettedSearchCombobox facet={TAGS} />
          <FacettedSearchList facet={GENRES} previewCount={10} />
        </div>
      </Aside>
      <Observe
        box='content-box'
        render={({ observedElementProps }) => (
          <div className={styles.results} {...observedElementProps}>
            {columns < 2 && (
              <div className={styles.searchButton}>
                <Button onClick={handleOpenDrawer} text='Search options' Icon={Icon.Tasks} disabled={drawer !== null} />
              </div>
            )}
            {query.results.length > 0 && <MixListHeader />}
            {query.results.length === 0
              ? query.statusText
              : query.results.map((result, index) => (
                  <MixListItem key={`result-${index}`} detailsInDrawer={columns < 3} {...result} />
                ))}
            <div className={styles.footer}>
              {query.nextPage && !query.statusText ? (
                <Button
                  onClick={() => dispatch(fetchNextPage())}
                  text={query.isFetching ? 'Loading' : 'Show more results'}
                  Icon={query.isFetching ? Icon.Snooze : Icon.CaretDown}
                  disabled={query.isFetching}
                />
              ) : (
                <Button
                  text={query.isFetching ? 'Loading' : 'Need more? Change your search options'}
                  Icon={query.isFetching ? Icon.Snooze : () => null}
                  disabled
                />
              )}
            </div>
          </div>
        )}
      />
      <Aside drawer={columns < 3 ? RESULT_DETAILS_DRAWER : undefined}>
        {details ? <MixDetails {...details} /> : <MixDetails empty />}
      </Aside>
    </div>
  );
};

export default Home;
