import { ENV_PREFIX, STATE } from './constants.js';

export function getConferenceList() {
    const conferenceListLink = `https://${
        ENV_PREFIX[localStorage.getItem(STATE.ENV_KEY)].app
    }files.sigchi.org/conference/cache/program-list`;
    localStorage.setItem(STATE.CONFERENCE_LIST_LINK, conferenceListLink);

    return fetch(conferenceListLink).then((data) => data.json());
}

export function getUserData(token) {
    const userDataLink = `https://${ENV_PREFIX[localStorage.getItem(STATE.ENV_KEY)].api}.sigchi.org/api/cloud/external/read/all`;
    localStorage.setItem(STATE.USER_DATA_LINK, userDataLink);

    return fetch(userDataLink, {
        method: 'POST',
        body: JSON.stringify({ lastSyncDate: 0 }),
        headers: {
            'Sigchi-User-Token': token,
            'Public-App-Signature': 'client: sample-app, app: 0.0.1',
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());
}

export function getContentList(shortName, year) {
    const contentListLink = `https://${
        ENV_PREFIX[localStorage.getItem(STATE.ENV_KEY)].app
    }files.sigchi.org/conference/program/${shortName}/${year}`;
    localStorage.setItem(STATE.CONTENT_LIST_LINK, contentListLink);

    return fetch(contentListLink).then((data) => data.json());
}
