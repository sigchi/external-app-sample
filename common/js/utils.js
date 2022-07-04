import { DAYS, DEFAULT_CONTENT_TYPE_DURATION, ENV_PREFIX, MILLISECONDS_IN_SECOND, MONTHS, SECONDS_IN_MINUTE, STATE } from './constants.js';

export function getQueryParams() {
    if (!location.search) {
        return {};
    }

    return location.search
        .replace('?', '')
        .split('&')
        .reduce((result, param) => {
            const [firstParam, secondParam] = param.split('=');
            result[decodeURIComponent(firstParam)] = decodeURIComponent(secondParam);

            return result;
        }, {});
}

export function getUserDataFromToken(token) {
    try {
        return jwt_decode(token);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export function removeQueryParamsFromUrl() {
    window.history.replaceState('', '', window.location.pathname);
}

export function sortByField(list, field, isAsc) {
    return list.sort((first, second) =>
        isAsc ? Number(first[field]) - Number(second[field]) : Number(second[field]) - Number(first[field]),
    );
}

export function generateConferenceTitle({ name }) {
    const conferenceTitle = document.createElement('h2');
    conferenceTitle.innerText = name;
    return conferenceTitle;
}

export function generateSessionCardHtml(lastSessionDate, day, name, contentsData) {
    return `${lastSessionDate !== day ? `<h3 class="session-title date-title">${day}</h3>` : ''}
          <div class="session-card">
          <h3 class="session-title">${name}</h3>
          <div class="content-list">
            ${contentsData}
          </div>
          </div>`;
}

export function generateContentCardHtml(title, timeSlot, color, name) {
    return `<div class="content-card" style="--color-type: ${color}">
          <h3>${title}</h3>
          <div class="content">
            <span class="content-time"> ${timeSlot} </span>
            <hr />
            <span class="color-dot" style="background-color: ${color}"></span>
            <span class="content-type"> ${name} </span>
          </div>
          </div>`;
}

export function generateTimeSlot(date) {
    return date ? `${getTimeSlotWithoutTimeZone(date)}` : '';
}

function getTimeSlotWithoutTimeZone(date) {
    return new Date(date).toISOString().slice(11, 16);
}

export function generateDay(date) {
    const dayDate = new Date(date);
    return date ? `${DAYS[dayDate.getDay()]}, ${MONTHS[dayDate.getMonth()]} ${dayDate.getDate()}` : '';
}

export function toMapBy(items, getIdFn) {
    return items.reduce((accumulator, item) => {
        accumulator[getIdFn(item)] = item;
        return accumulator;
    }, {});
}

export function getLoginUrl(clientId, endSegment = '') {
    return `https://${ENV_PREFIX[localStorage.getItem(STATE.ENV_KEY)].app}programs.sigchi.org/login?clientId=${clientId}&callback=${
        location.href
    }${endSegment}`;
}

export function getContentDate(sessionId, contentId, sessionsMap, contentsMap, contentTypesMap, timeSlotsMap) {
    function getContentDatesInSession(sessionId, contentId) {
        return createContentDatesById(getContentStartDateById(sessionId, contentId), contentId);
    }

    function createContentDatesById(startDate, contentId) {
        return createContentDates(startDate, contentsMap[contentId]);
    }

    function createContentDates(startDate, content) {
        return { startDate, endDate: calculateContentEndDate(startDate, content) };
    }

    function calculateContentEndDate(startDate, content) {
        return calculateEndDate(startDate, getContentMillis(content));
    }

    function calculateEndDate(startDate, millis) {
        return startDate + millis;
    }

    function getContentStartDateById(sessionId, contentId) {
        return getContentStartDate(
            {
                ...timeSlotsMap[sessionsMap[sessionId].timeSlotId],
                ...sessionsMap[sessionId],
            },
            contentId,
        );
    }

    function getContentStartDate(session, contentId) {
        return session ? session.startDate + getMillisUntilContent(session, contentId) : '';
    }

    function getMillisUntilContent(session, contentId) {
        return session.isParallelPresentation ? 0 : minutesToMillis(getMinutesUntilContent(session, contentId));
    }

    function getMinutesUntilContent(session, contentId) {
        return getContentsDurationByIds(session.contentIds.slice(0, session.contentIds.indexOf(contentId)));
    }

    function getContentsDurationByIds(contentIds) {
        return getContentsDuration(Object.values(contentsMap).filter((content) => contentIds.includes(content.id)));
    }

    function getContentsDuration(contents) {
        return sum(contents, (content) => getContentDuration(content));
    }

    function getContentMillis(content) {
        return minutesToMillis(getContentDuration(content));
    }

    function getContentDuration(content) {
        const contentType = contentTypesMap[content.typeId];
        return content.durationOverride || (contentType ? contentType.duration : DEFAULT_CONTENT_TYPE_DURATION);
    }

    function minutesToMillis(minutes) {
        return minutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
    }

    function sum(items, callback) {
        return items.reduce((accumulator, item) => accumulator + callback(item), 0);
    }

    return getContentDatesInSession(sessionId, contentId);
}

export function setJSONtoSessionStorage(key, json) {
    sessionStorage.setItem(key, JSON.stringify(json));
}

export function setJSONtoLocalStorage(key, json) {
    localStorage.setItem(key, JSON.stringify(json));
}

export function getJSONfromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function getJSONfromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
