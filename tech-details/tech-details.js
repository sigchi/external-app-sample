import { ELEMENTS_ID, STATE } from '../common/js/constants.js';
import { jsonViewer } from '../common/libs/json-viewer/json-viewer.js';
import { getJSONfromLocalStorage, getJSONfromSessionStorage } from '../common/js/utils.js';

document.getElementById(ELEMENTS_ID.TECH_DETAILS_JSON).innerHTML = jsonViewer({
    tech_details: getJSONfromLocalStorage(STATE.TOKEN_DATA),
});
document.getElementById(ELEMENTS_ID.CONFERENCE_LIST_LINK).innerHTML = localStorage.getItem(STATE.CONFERENCE_LIST_LINK);
document.getElementById(ELEMENTS_ID.CONFERENCE_LIST_JSON).innerHTML = jsonViewer({
    conference_list: getJSONfromSessionStorage(STATE.CONFERENCE_LIST_JSON),
});
document.getElementById(ELEMENTS_ID.CONTENT_LIST_LINK).innerHTML = localStorage.getItem(STATE.CONTENT_LIST_LINK);
document.getElementById(ELEMENTS_ID.CONTENT_LIST_JSON).innerHTML = jsonViewer({
    content_list: getJSONfromSessionStorage(STATE.CONTENT_LIST_JSON),
});
document.getElementById(ELEMENTS_ID.USER_DATA_LINK).innerHTML = localStorage.getItem(STATE.USER_DATA_LINK);
document.getElementById(ELEMENTS_ID.USER_DATA_JSON).innerHTML = getJSONfromLocalStorage(STATE.USER_DATA)
    ? jsonViewer({
          my_schedule: getJSONfromLocalStorage(STATE.USER_DATA),
      })
    : '<div class="empty-schedule">To view JSON about myScheduleSessions please go to the \'My schedule page\' and return back</div>';
