import * as api from './api.js';

export async function getDestinations() {
    return await api.get('/classes/destinations');
}