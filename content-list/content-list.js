import {
    generateConferenceTitle,
    generateContentCardHtml,
    generateDay,
    generateSessionCardHtml,
    generateTimeSlot,
    getContentDate,
    getQueryParams,
    setJSONtoLocalStorage,
    setJSONtoSessionStorage,
    toMapBy,
} from '../common/js/utils.js';
import { getContentList } from '../common/js/api.js';
import { ELEMENTS_ID, STATE } from '../common/js/constants.js';

const { name, year } = getQueryParams();
let sessionsMap;
let contentsMap;
let contentTypesMap;
let timeSlotsMap;
let lastSessionDate;

getContentList(name, year).then((contentList) => {
    const { conference, sessions, contents, contentTypes, timeSlots } = contentList;
    sessionsMap = toMapBy(sessions, (session) => session.id);
    contentsMap = toMapBy(contents, (content) => content.id);
    contentTypesMap = toMapBy(contentTypes, (contentType) => contentType.id);
    timeSlotsMap = toMapBy(timeSlots, (timeSlot) => timeSlot.id);

    setJSONtoSessionStorage(STATE.CONTENT_LIST_JSON, contentList);
    setJSONtoLocalStorage(STATE.CONFERENCE, conference);
    setJSONtoLocalStorage(STATE.SESSIONS, sessionsMap);
    setJSONtoLocalStorage(STATE.CONTENTS, contentsMap);
    setJSONtoLocalStorage(STATE.CONTENT_TYPES, contentTypesMap);
    setJSONtoLocalStorage(STATE.TIME_SLOTS, timeSlotsMap);

    sessions.sort((first, second) => {
        if (first.timeSlotId && second.timeSlotId) {
            return timeSlotsMap[first.timeSlotId].startDate - timeSlotsMap[second.timeSlotId].startDate;
        }

        if (first.timeSlotId && !second.timeSlotId) {
            return -1;
        }

        if (!first.timeSlotId && second.timeSlotId) {
            return 1;
        }

        return 0;
    });

    document.getElementById(ELEMENTS_ID.MAIN).innerHTML =
        sessions.length > 0
            ? sessions.reduce((result, session) => result + generateSessionCard(session), '')
            : '<div class="empty-schedule">Oops, looks like this conference isn’t ready yet!<br> We cannot find any content related to this conference</div>';
    document.getElementById(ELEMENTS_ID.MAIN).prepend(generateConferenceTitle(conference));
});

function generateSessionCard(session) {
    const { startDate } = timeSlotsMap[session.timeSlotId] ? timeSlotsMap[session.timeSlotId] : { startDate: null };
    const day = generateDay(startDate);
    const contentCards = session.contentIds.reduce((contentCards, contentId) => {
        const content = contentsMap[contentId];
        return contentCards + generateContentCard(session, content);
    }, '');
    const sessionCard = generateSessionCardHtml(lastSessionDate, day, session.name, contentCards);

    lastSessionDate = day;

    return sessionCard;
}

function generateContentCard(session, content) {
    const { color, name } = content.typeId ? contentTypesMap[content.typeId] : { color: '', name: '' };
    const { startDate } = getContentDate(session.id, content.id, sessionsMap, contentsMap, contentTypesMap, timeSlotsMap);
    const timeSlot = generateTimeSlot(startDate);

    return generateContentCardHtml(content.title, timeSlot, color, name);
}
