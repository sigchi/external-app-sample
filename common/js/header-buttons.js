import {ELEMENTS_ID, PRODUCTION_PREFIX, STATE} from './constants.js';

document.getElementById(ELEMENTS_ID.CONFERENCE_BUTTON).onclick = clickConferenceList;
document.getElementById(ELEMENTS_ID.MY_SCHEDULE_BUTTON).onclick = clickMySchedule;
document.getElementById(ELEMENTS_ID.TECH_DETAILS_BUTTON).onclick = clickProfile;
document.getElementById(ELEMENTS_ID.LOG_OUT_BUTTON).onclick = clickLogout;
document.getElementById(ELEMENTS_ID.CONTENT_BUTTON).onclick = clickContentList;

function clickConferenceList() {
    location.href = location.origin + `/${PRODUCTION_PREFIX}/conference-list/conference-list.html`;
}

function clickMySchedule() {
    location.href = location.origin + `/${PRODUCTION_PREFIX}/my-schedule/my-schedule.html`;
}

function clickProfile() {
    location.href = location.origin + `/${PRODUCTION_PREFIX}/tech-details/tech-details.html`;
}

function clickLogout() {
    location.href = location.origin + `/${PRODUCTION_PREFIX}`;
    localStorage.clear();
    sessionStorage.clear();
}

function clickContentList() {
    location.href = location.origin + localStorage.getItem(STATE.CONFERENCE_LINK);
}
