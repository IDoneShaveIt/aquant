import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import useResource from '../../services/useResource.jsx';
import ResourceManager from '../resourceManager/ResourceManager.jsx';
import {getLocationByAddress} from '../../services/fetchers.js';
import {getCoordinatesFromBingMapObject, formatPushpin} from '../../utils/parseLocationResult.js';
import {BING_MAP_API} from '../../configuration.js';

export default function MapView({searchedLocation}) {
    const locationByAddressResource = useResource(() => getLocationByAddress(searchedLocation));

    useEffect(() => {
        if (!_.isEmpty(searchedLocation)) {
            locationByAddressResource.execute();
        }
    }, [searchedLocation]);

    return <ResourceManager resource={locationByAddressResource}>
        {
            data => {
                const coordinates = getCoordinatesFromBingMapObject(data);
                return <div className="map-view">
                    <div>new searched: {searchedLocation} {coordinates}</div>
                    <Map coordinates={coordinates}/>
                </div>;
            }
        }
    </ResourceManager>;
}


function Map({coordinates}) {
    const [allCoordinates, setAllCoordinates] = useState(coordinates.join(','));
    const [pushpinNumber, setPushpinNumber] = useState(1);
    const [allCoordinatesPushpins, setAllCoordinatesPushpins] = useState(formatPushpin(coordinates, pushpinNumber));

    useEffect(() => {
        const newAllCoordinates = `${coordinates.join(',')}_${allCoordinates}`;
        setAllCoordinates(newAllCoordinates);

        const newPushpins = `${allCoordinatesPushpins}${formatPushpin(coordinates, pushpinNumber)}`;
        setAllCoordinatesPushpins(newPushpins);
        setPushpinNumber(pushpinNumber + 1);
    }, [coordinates]);

    console.log(pushpinNumber)
    console.log(allCoordinatesPushpins)

    return <div className="map">
        <img src={BING_MAP_API.getPPByCoordinates(allCoordinatesPushpins)}/>
    </div>;

}