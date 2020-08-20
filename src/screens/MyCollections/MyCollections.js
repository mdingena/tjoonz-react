import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Observe, useBreakpoints } from '@envato/react-breakpoints';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectAuth from '../../selectors/selectAuth';
import selectDrawer from '../../selectors/selectDrawer';
import selectCollections from '../../selectors/selectCollections';
import selectDetails from '../../selectors/selectDetails';
import openDrawer from '../../actions/openDrawer';
import fetchMyCollections from '../../actions/fetchMyCollections';
import fetchMyCollectionsMixesNextPage from '../../actions/fetchMyCollectionsMixesNextPage';
import renameMyCollection from '../../actions/renameMyCollection';
import addTasks from '../../actions/addTasks';
import completeTasks from '../../actions/completeTasks';
import deleteMyCollection from '../../api/deleteMyCollection';
import { MY_COLLECTIONS_DRAWER, RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import Aside from '../../components/Aside';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import ManageCollection from '../../components/ManageCollection';
import CollectionListHeader from '../../components/CollectionListHeader';
import CollectionListItem from '../../components/CollectionListItem';
import MixDetails from '../../components/MixDetails';
import styles from './MyCollections.module.css';

const DELETE_COLLECTION = 'DELETE_COLLECTION';

const grid = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns
};

const MyCollections = () => {
  const hasFetched = useRef(false);
  const inputRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const drawer = useSelector(selectDrawer);
  const collections = useSelector(selectCollections);
  const details = useSelector(selectDetails);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const handleSignIn = useCallback(() => {
    history.push('/sign-in/', { from: location.pathname });
  }, [history, location.pathname]);

  useEffect(() => {
    if (
      !hasFetched.current ||
      (!collections.isFetching && collections.statusText === null && collections.collections.length === 0)
    ) {
      hasFetched.current = true;
      const action = fetchMyCollections();
      dispatch(action);
    }
  }, [collections, dispatch]);

  useEffect(() => {
    const fetchError = collections.statusText !== null;
    const isNewQuery = collections.nextPage === 2;
    if (!collections.isFetching && !fetchError && isNewQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsDeletePending(false);
  }, [collections]);

  const handleOpenDrawer = () => {
    const action = openDrawer(MY_COLLECTIONS_DRAWER);
    dispatch(action);
  };

  const handleRename = () => {
    if (inputRef.current) {
      const action = renameMyCollection(collections.current.id, inputRef.current.value);
      dispatch(action);
    }
  };

  const handleDelete = async () => {
    dispatch(addTasks(DELETE_COLLECTION, 1));

    const response = await deleteMyCollection(collections.current.id, auth.token);

    if (!response.ok) {
      dispatch(completeTasks(DELETE_COLLECTION, 1));
      return;
    }

    const result = await response.json();

    if (!result.success) {
      dispatch(completeTasks(DELETE_COLLECTION, 1));
      return;
    }

    dispatch(fetchMyCollections());
    dispatch(completeTasks(DELETE_COLLECTION, 1));
  };

  const [columns = 1] = useBreakpoints({
    box: 'content-box',
    widths: {
      0: 1,
      621: 2,
      1025: 3
    }
  });

  if (!auth.token) {
    return <Button onClick={handleSignIn} text='Sign in to manage your collections' Icon={Icon.ShieldCheck} />;
  }

  if (!columns) return null;

  return (
    <div className={grid[columns]}>
      <Aside drawer={columns < 2 ? MY_COLLECTIONS_DRAWER : undefined}>
        <div className={styles.myCollections}>
          <div className={styles.myCollectionsHeading}>Collections</div>
          {collections.collections.map((collection, index) => (
            <ManageCollection
              key={`playlist-${index}`}
              {...collection}
              active={collection.id === collections.current.id}
            />
          ))}
        </div>
      </Aside>
      <Observe
        box='content-box'
        render={({ observedElementProps }) => (
          <div className={styles.results} {...observedElementProps}>
            {columns < 2 && (
              <div className={styles.searchButton}>
                <Button
                  onClick={handleOpenDrawer}
                  text='Select collection'
                  Icon={Icon.AlbumCollection}
                  disabled={drawer !== null}
                />
              </div>
            )}
            <div className={styles.playlistName}>
              <input
                key={collections.current.id}
                ref={inputRef}
                className={styles.input}
                placeholder='Collection name'
                type='text'
                defaultValue={collections.current.name}
              />
              <Button onClick={handleRename} text='Rename' Icon={Icon.Save} disabled={drawer !== null} />
            </div>
            <div className={styles.controls}>
              {isDeletePending ? (
                <>
                  <Button onClick={handleDelete} text='Delete forever' disabled={drawer !== null} danger />
                  <Button onClick={() => setIsDeletePending(false)} text='Cancel' disabled={drawer !== null} />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => console.log('todo')}
                    text='Queue all'
                    Icon={Icon.PlusSquare}
                    disabled={drawer !== null}
                  />
                  <Button
                    onClick={() => setIsDeletePending(true)}
                    text='Delete'
                    Icon={Icon.TrashAlt}
                    disabled={drawer !== null}
                  />
                </>
              )}
            </div>
            {collections.mixes.length === 0 ? (
              collections.statusText
            ) : (
              <>
                <CollectionListHeader />
                {collections.mixes.map((mix, index) => (
                  <CollectionListItem
                    key={`mix-${index}`}
                    detailsInDrawer={columns < 3}
                    mix={mix}
                    collectionId={collections.current.id}
                  />
                ))}
              </>
            )}
            <div className={styles.footer}>
              {!collections.isFetching && collections.current.id && !collections.statusText ? (
                <Button
                  onClick={() => dispatch(fetchMyCollectionsMixesNextPage())}
                  text={
                    collections.current.mixes.length && collections.nextPage ? 'Show more results' : 'End of collection'
                  }
                  Icon={collections.current.mixes.length && collections.nextPage ? Icon.CaretDown : () => null}
                />
              ) : (
                <Button text='Loading' Icon={Icon.Snooze} disabled />
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

export default MyCollections;
