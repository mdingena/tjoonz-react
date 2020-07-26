import { RESUME_PLAYBACK } from '../constants/actionTypes';

const resumePlayback = () => (dispatch, getState) => {
  const {
    player: { playlist, playhead }
  } = getState();

  const canResume = playlist[playhead];

  if (canResume) {
    dispatch({
      type: RESUME_PLAYBACK
    });
  }
};

export default resumePlayback;
