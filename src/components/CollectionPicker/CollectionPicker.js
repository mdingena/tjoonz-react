import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import selectAuth from '../../selectors/selectAuth';
import selectCollections from '../../selectors/selectCollections';
import fetchMyCollections from '../../actions/fetchMyCollections';
import addTasks from '../../actions/addTasks';
import completeTasks from '../../actions/completeTasks';
import postMyCollectionsMix from '../../api/postMyCollectionsMix';
import Button from '../Button';
import Icon from '../Icon';
import SelectCollection from './SelectCollection';
import styles from './CollectionPicker.module.css';

const TASK = 'SAVE_MIX_TO_COLLECTION';

const CollectionPicker = ({ mixId, onClose }) => {
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);
  const collections = useSelector(selectCollections);

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

  const handleSave = async collectionId => {
    dispatch(addTasks(TASK, 1));
    const response = await postMyCollectionsMix(mixId, collectionId, null, token);
    console.log(response);
    if (!response.ok) {
      dispatch(completeTasks(TASK, 1));
      return;
    }

    const result = await response.json();
    console.log(result);

    if (!result.success) {
      dispatch(completeTasks(TASK, 1));
      return;
    }

    dispatch(fetchMyCollections());
    dispatch(completeTasks(TASK, 1));
  };

  return (
    <div className={styles.root}>
      <Button onClick={onClose} text='Close' />
      <div className={styles.collections}>
        <div className={styles.new}>
          <input className={styles.input} placeholder='Create new collection' />
          <Button onClick={() => console.log('todo')} Icon={Icon.Save} text='New' />
        </div>
        {collections.collections.map(({ id, name, count, mixes }, index) => (
          <SelectCollection
            key={`collection-${index}`}
            name={name}
            count={count}
            onClick={() => handleSave(id)}
            disabled={mixes.includes(mixId)}
          />
        ))}
      </div>
    </div>
  );
};

CollectionPicker.propTypes = {
  mixId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CollectionPicker;
