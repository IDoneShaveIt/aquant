import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import MapView from '../mapView/MapView.jsx';
import LocationsSearchBar from '../locationsSearchBar/LocationsSearchBar.jsx';
import CoordinatesList from '../CoordinatesList/CoordinatesList.jsx';
import './mainApp.css';


export default function MainApp() {
    const [searchedLocation, setSearchedLocation] = useState('');
    const [allCoordinates, setAllCoordinates] = useState({});

    return <div className="main-app">
        <div className="map-and-search">
            <LocationsSearchBar setSearchedLocation={setSearchedLocation}/>
            <MapView
                searchedLocation={searchedLocation}
                allCoordinates={allCoordinates}
                setAllCoordinates={setAllCoordinates}
            />
        </div>
        <CoordinatesList allCoordinates={allCoordinates} setAllCoordinates={setAllCoordinates}/>
    </div>;
}
