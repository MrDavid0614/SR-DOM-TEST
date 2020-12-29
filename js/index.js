import {global} from './global.js';
import {chargeListeners} from './listeners.js';
import {table} from './table.js';

chargeListeners();

if (table.isTableFirstRow()) {

    global.newColumnBtn.disabled = true;
    
}