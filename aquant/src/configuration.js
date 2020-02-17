export const BING_MAP_KEY = 'AlyZx7r_wvpELhsNAl-5tygtipVov-ygJrDKG7sUhdjvmHf2Jb2t2_LmCe9lqtbB';

export const BING_MAP_API = {
    getLocationByAddress: (address) => `http://dev.virtualearth.net/REST/v1/Locations?q=${address}&maxRes=1&key=${BING_MAP_KEY}`,
    getRoadByCoordinates: (coordinates, lastCoordinates) => `http://dev.virtualearth.net/REST/V1/Imagery/Map/Road/${lastCoordinates}/9?mapSize=400,500&dc=l,FF009900,3;${coordinates}&fmt=png&key=${BING_MAP_KEY}`,
    getPPByCoordinates: (pushpinsCoordinates) => `http://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels?${pushpinsCoordinates}&key=${BING_MAP_KEY}`,
};
