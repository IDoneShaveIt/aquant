import React, {useState} from 'react';
import MapView from '../mapView/MapView.jsx';
import LocationsSearchBar from '../locationsSearchBar/LocationsSearchBar.jsx';
import './mainApp.css';


export default function MainApp() {
    const [searchedLocation, setSearchedLocation] = useState('');

    return <div className="main-app">
        <LocationsSearchBar setSearchedLocation={setSearchedLocation}/>
        <MapView searchedLocation={searchedLocation}/>
    </div>;
}