export const ENV_PREFIX = {
    development: { app: 'dev-', api: 'api-dev' },
    staging: { app: 'staging-', api: 'api-staging' },
    production: { app: '', api: 'api' },
};

export const ELEMENTS_ID = {
    LOGIN_BUTTON: 'login-button',
    ENV_SELECT: 'env-select',
    CLIENT_ID: 'client-id',
    MAIN: 'main',
    LOG_OUT_BUTTON: 'log-out-button',
    CONFERENCE_BUTTON: 'conference-button',
    CONTENT_BUTTON: 'content-button',
    MY_SCHEDULE_BUTTON: 'my-schedule-button',
    TECH_DETAILS_BUTTON: 'profile-button',
    CONFERENCE_LIST_JSON: 'conference-list-json',
    CONTENT_LIST_JSON: 'content-list-json',
    TECH_DETAILS_JSON: 'tech-details-json',
    CONFERENCE_LIST_LINK: 'conference-list-link',
    CONTENT_LIST_LINK: 'content-list-link',
    USER_DATA_LINK: 'user-data-link',
    USER_DATA_JSON: 'user-data-json',
};

export const STATE = {
    ENV_KEY: 'ENV',
    CLIENT_ID: 'clientId',
    TOKEN: 'token',
    TOKEN_DATA: 'tokenData',
    USER_DATA: 'userData',
    CONFERENCE: 'conference',
    CONFERENCE_LINK: 'conferenceLink',
    CONTENT_TYPES: 'contentTypes',
    CONTENTS: 'contents',
    SESSIONS: 'sessions',
    TIME_SLOTS: 'timeSlots',
    CONFERENCE_LIST_JSON: 'conferenceListJson',
    CONTENT_LIST_JSON: 'contentListJson',
    TECH_DETAILS_JSON: 'techDetailsJson',
    CONFERENCE_LIST_LINK: 'conferenceListLink',
    CONTENT_LIST_LINK: 'contentListLink',
    USER_DATA_LINK: 'userDataLink',
};

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const DEFAULT_CONTENT_TYPE_DURATION = 0;
