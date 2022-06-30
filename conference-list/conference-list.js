import { getConferenceList } from '../common/js/api.js';
import {
    getQueryParams,
    getUserDataFromToken,
    removeQueryParamsFromUrl,
    setJSONtoLocalStorage,
    setJSONtoSessionStorage,
    sortByField,
} from '../common/js/utils.js';
import { ELEMENTS_ID, MONTHS, STATE } from '../common/js/constants.js';

init();
localStorage.removeItem(STATE.CONTENT_LIST_LINK);
localStorage.removeItem(STATE.SESSIONS);
localStorage.removeItem(STATE.CONFERENCE);
localStorage.removeItem(STATE.CONTENTS);
localStorage.removeItem(STATE.CONTENT_LIST_LINK);
localStorage.removeItem(STATE.CONTENT_TYPES);
localStorage.removeItem(STATE.TIME_SLOTS);
sessionStorage.removeItem(STATE.CONFERENCE_LIST_JSON);
sessionStorage.removeItem(STATE.CONTENT_LIST_JSON);

getConferenceList().then((conferenceList) => {
    setJSONtoSessionStorage(STATE.CONFERENCE_LIST_JSON, conferenceList);

    document.getElementById(ELEMENTS_ID.MAIN).innerHTML = '';
    document.getElementById(ELEMENTS_ID.MAIN).appendChild(generateConferenceList(sortByField(conferenceList, 'startDate')));
});

function init() {
    localStorage.removeItem(STATE.CONFERENCE_LINK);
    localStorage.removeItem(STATE.CONFERENCE);
    const { token } = getQueryParams();
    removeQueryParamsFromUrl();
    if (token) {
        setJSONtoLocalStorage(STATE.TOKEN_DATA, getUserDataFromToken(token));
        localStorage.setItem(STATE.TOKEN, token);
    }
}

function clickConference(name, year) {
    const conferenceLink = `/content-list/content-list.html?name=${name}&year=${year}`;
    localStorage.setItem(STATE.CONFERENCE_LINK, conferenceLink);
    location.href = location.origin + conferenceLink;
}

function generateConferenceList(sortedConferenceList) {
    const wrapper = document.createElement('div');
    const cards = sortedConferenceList.map((conference) => generateConferenceCard(conference));

    wrapper.classList.add('conference-list-wrapper');
    wrapper.append(...cards);

    return wrapper;
}

function generateConferenceCard({ id, shortName, year, startDate, endDate, name, fullName, logoUrl }) {
    const card = document.createElement('div');
    card.classList.add('conference-card');
    card.id = id;
    card.onclick = () => {
        clickConference(shortName, year);
    };

    const conferenceStartDate = new Date(startDate);
    const conferenceEndDate = new Date(endDate);
    const dateString = `${conferenceStartDate.getDate()} ${MONTHS[conferenceStartDate.getMonth()]} - ${conferenceEndDate.getDate()} ${
        MONTHS[conferenceEndDate.getMonth()]
    }`;

    card.innerHTML = `<img src="${logoUrl}" class="logo-image"  alt=""/>
                    <div class="conference-content">
                      <div class="conference-name">${name}</div>
                      <div class="conference-date">${dateString}</div>
                      <div class="conference-full-name">${fullName}</div>
                    </div>`;

    return card;
}
