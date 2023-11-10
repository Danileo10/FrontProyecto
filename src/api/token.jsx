import {TOKEN} from '../utils/constants'

export const setToken = (token) => {
    // Incrementa la marca de tiempo para notificar a otras pestañas
    localStorage.setItem('tokenSetAt', Date.now().toString());
    localStorage.setItem(TOKEN, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN);
}

export const removeToken = () => {
    // Incrementa la marca de tiempo para notificar a otras pestañas
    localStorage.setItem('tokenRemovedAt', Date.now().toString());

    // Elimina el token
    localStorage.removeItem(TOKEN);
}
