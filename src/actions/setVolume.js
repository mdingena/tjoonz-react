import { SET_VOLUME } from '../constants/actionTypes';
import { VOLUME_POWER } from '../constants/volume';

/**
 * Linear volume sliders are evil!
 * https://www.dr-lex.be/info-stuff/volumecontrols.html
 */
const setVolume = linearVolume => ({
  type: SET_VOLUME,
  payload: {
    volume: Math.pow(linearVolume, VOLUME_POWER)
  }
});

export default setVolume;
