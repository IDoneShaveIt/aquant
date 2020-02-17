import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import useResource from '../../services/useResource.jsx';
import ResourceManager from '../resourceManager/ResourceManager.jsx';
import {getLocationByAddress} from '../../services/fetchers.js';
import {getCoordinatesFromBingMapObject, formatPushpin} from '../../utils/parseLocationResult.js';
import {BING_MAP_API} from '../../configuration.js';


export default function MapView({searchedLocation, allCoordinates, setAllCoordinates}) {
    const [pushpinNumber, setPushpinNumber] = useState(1);
    const [allCoordinatesPushpins, setAllCoordinatesPushpins] = useState('');
    const locationByAddressResource = useResource(() => getLocationByAddress(searchedLocation));

    async function execute() {
        const result = await locationByAddressResource.execute();
        const coordinates = getCoordinatesFromBingMapObject(result);

        const newAllCoordinates = _.clone(allCoordinates);
        newAllCoordinates[pushpinNumber] = coordinates;
        setAllCoordinates(newAllCoordinates);

        const newPushpins = `${allCoordinatesPushpins}${formatPushpin(coordinates, pushpinNumber)}`;
        setAllCoordinatesPushpins(newPushpins);

        setPushpinNumber(pushpinNumber + 1);
    }

    useEffect(() => {
        if (!_.isEmpty(searchedLocation)) {
            execute();
        }
    }, [searchedLocation]);

    return <ResourceManager resource={locationByAddressResource}>
        {
            data => {
                const coordinates = getCoordinatesFromBingMapObject(data);
                return <div className="map-view">
                    <div>new searched: {searchedLocation} {coordinates}</div>
                    <Map coordinatesPushpins={allCoordinatesPushpins}/>
                </div>;
            }
        }
    </ResourceManager>;
}

MapView.propTypes = {
    searchedLocation: PropTypes.string,
    allCoordinates: PropTypes.object.isRequired,
    setAllCoordinate: PropTypes.func.isRequired
};


function Map({coordinatesPushpins}) {
    return <div className="map">
        <img src={BING_MAP_API.getPPByCoordinates(coordinatesPushpins)}/>
    </div>;
}

Map.propTypes = {
    coordinatesPushpins: PropTypes.string,
};