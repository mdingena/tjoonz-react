import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import setVolume from '../../actions/setVolume';
import Icon from '../Icon';
import { clamp } from '../../utils';
import styles from './VolumeControl.module.css';

const getDragPosition = event => {
  const target = event.nativeEvent.target;
  const targetClientY = target.getBoundingClientRect().bottom;

  if ('touches' in event.nativeEvent && event.nativeEvent.target instanceof window.HTMLElement) {
    const touch = event.nativeEvent.touches[0];
    return targetClientY - touch.clientY;
  }

  if ('offsetX' in event.nativeEvent) {
    const mouse = event.nativeEvent;
    return targetClientY - mouse.clientY;
  }

  return 0;
};

const VolumeControl = () => {
  const sliderRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [volumeSlider, setVolumeSlider] = useState(0.8);

  const dispatch = useDispatch();

  const handleClick = () => setOpen(state => !state);

  const handleDragStart = event => {
    const linearVolume = getDragPosition(event) / sliderRef.current.clientHeight;
    const clampedVolume = clamp(linearVolume, 0, 1);

    setVolumeSlider(clampedVolume);
    setDragging(true);
  };

  const handleDrag = event => {
    if (isDragging) {
      const linearVolume = getDragPosition(event) / sliderRef.current.clientHeight;
      const clampedVolume = clamp(linearVolume, 0, 1);
      const action = setVolume(clampedVolume);

      setVolumeSlider(clampedVolume);
      dispatch(action);
    }
  };

  const handleDragEnd = event => {
    event.stopPropagation();
    setDragging(false);
  };

  const handleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  let volumeIcon;

  if (volumeSlider > 0.8) {
    volumeIcon = <Icon.VolumeUp className={styles.icon} />;
  } else if (volumeSlider > 0.4) {
    volumeIcon = <Icon.Volume className={styles.icon} />;
  } else if (volumeSlider > 0.05) {
    volumeIcon = <Icon.VolumeDown className={styles.icon} />;
  } else if (volumeSlider <= 0.05) {
    volumeIcon = <Icon.VolumeMute className={styles.icon} />;
  }

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={handleClick}>
        {volumeIcon}
      </button>
      {isOpen && (
        <div className={styles.control}>
          <div
            ref={sliderRef}
            className={styles.slider}
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
            onContextMenu={handleContextMenu}
          >
            <div className={styles.track}>
              <div className={styles.volume} style={{ height: `${volumeSlider * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeControl;
