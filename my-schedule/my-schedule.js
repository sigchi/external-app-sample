import { ELEMENTS_ID, STATE } from '../common/js/constants.js';
import {
    generateConferenceTitle,
    generateContentCardHtml,
    generateDay,
    generateSessionCardHtml,
    generateTimeSlot,
    getContentDate,
    getJSONfromLocalStorage,
    getLoginUrl,
    setJSONtoLocalStorage,
} from '../common/js/utils.js';
import { getUserData } from '../common/js/api.js';

const conference = getJSONfromLocalStorage(STATE.CONFERENCE);
const sessionsMap = getJSONfromLocalStorage(STATE.SESSIONS);
const contentsMap = getJSONfromLocalStorage(STATE.CONTENTS);
const contentTypesMap = getJSONfromLocalStorage(STATE.CONTENT_TYPES);
const timeSlotsMap = getJSONfromLocalStorage(STATE.TIME_SLOTS);
let lastSessionDate;

getUserData(localStorage.getItem(STATE.TOKEN)).then((userData) => {
    if (userData.message) {
        location.href = getLoginUrl(localStorage.getItem(STATE.CLIENT_ID));
    }
    setJSONtoLocalStorage(STATE.USER_DATA, userData);

    const { myScheduleSessions } = getJSONfromLocalStorage(STATE.USER_DATA);
    const scheduledData = myScheduleSessions
        .filter((session) => session.conferenceId === conference.id && session.myScheduleContents.find((content) => content.isAdded))
        .sort((first, second) => {
            const firstDate = sessionsMap[first.sessionId] ? timeSlotsMap[sessionsMap[first.sessionId].timeSlotId].startDate : 0;
            const secondDate = sessionsMap[second.sessionId] ? timeSlotsMap[sessionsMap[second.sessionId].timeSlotId].startDate : 0;
            return firstDate - secondDate;
        });

    document.getElementById(ELEMENTS_ID.MAIN).innerHTML =
        scheduledData.length > 0
            ? scheduledData.reduce((result, session) => result + generateSessionCard(session), '')
            : '<div class="empty-schedule">You have no content items in your schedule</div>';
    document.getElementById(ELEMENTS_ID.MAIN).prepend(generateConferenceTitle(conference));
});

function generateSessionCard(session) {
    if (sessionsMap[session.sessionId]) {
        const contentCards = session.myScheduleContents
            .map((content) => {
                const { startDate } = getContentDate(
                    session.sessionId,
                    content.contentId,
                    sessionsMap,
                    contentsMap,
                    contentTypesMap,
                    timeSlotsMap,
                );
                return { ...content, startDate };
            })
            .sort((first, second) => first.startDate - second.startDate)
            .reduce((contentCards, content) => contentCards + generateContentCard(session, content), '');
        const startDate = timeSlotsMap[sessionsMap[session.sessionId].timeSlotId].startDate;
        const day = generateDay(startDate);
        const sessionCard = generateSessionCardHtml(lastSessionDate, day, sessionsMap[session.sessionId].name, contentCards);

        lastSessionDate = day;

        return sessionCard;
    }

    return '';
}

function generateContentCard(session, content) {
    if (content.isAdded) {
        const { color, name } = content.contentId ? contentTypesMap[contentsMap[content.contentId].typeId] : { color: '', name: '' };
        const timeSlot = generateTimeSlot(content.startDate);

        return generateContentCardHtml(contentsMap[content.contentId].title, timeSlot, color, name);
    }

    return '';
}
