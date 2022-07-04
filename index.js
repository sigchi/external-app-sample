import { STATE, ELEMENTS_ID } from './common/js/constants.js';
import { getLoginUrl } from './common/js/utils.js';

localStorage.clear();
document.getElementById(ELEMENTS_ID.LOGIN_BUTTON).onclick = handleClickLoginButton;

function handleClickLoginButton() {
    document.getElementById('unselected-environment').classList.remove('show');
    document.getElementById('unselected-client-id').classList.remove('show');
    const clientId = getClientId();
    const env = getSelectedEnv();
    if (!env) {
        document.getElementById('unselected-environment').classList.add('show');
    }

    if (!clientId) {
        document.getElementById('unselected-client-id').classList.add('show');
    }

    if (env && clientId) {
        localStorage.setItem(STATE.ENV_KEY, env);
        localStorage.setItem(STATE.CLIENT_ID, clientId);
        location.href = getLoginUrl(clientId, 'conference-list/conference-list.html');
    }
}

function getSelectedEnv() {
    return document.getElementById(ELEMENTS_ID.ENV_SELECT).value;
}

function getClientId() {
    return document.getElementById(ELEMENTS_ID.CLIENT_ID).value;
}
