import * as global from './global.js';
import {chargeListeners} from './listeners.js';

chargeListeners();

if (global.isTableFirstRow()) {

    global.newColumnBtn.disabled = true;

}