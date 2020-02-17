import axios from 'axios';
import {BING_MAP_API} from '../configuration.js';


export async function getLocationByAddress(address) {
    const url = BING_MAP_API.getLocationByAddress(address);

    const response = await axios.get(url);
    return response.data;
}