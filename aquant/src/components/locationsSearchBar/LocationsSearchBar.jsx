import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FilledInput, InputAdornment, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


export default function LocationsSearchBar({setSearchedLocation}) {
    const [locationInput, setLocationInput] = useState('');

    return <div className="search-bar">
        <FilledInput
            placeholder="search"
            value={locationInput}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon className="search-icon"/>
                </InputAdornment>
            }
            onChange={(event) => setLocationInput(event.target.value)}
        />
        <SearchButton locationInput={locationInput} setSearchedLocation={setSearchedLocation}/>
    </div>
}

LocationsSearchBar.propTypes = {
    setSearchedLocation: PropTypes.func.isRequired,
};


function SearchButton({locationInput, setSearchedLocation}) {
    const onClick = () => setSearchedLocation(locationInput);
        return <Button
            className="search-button"
            variant="contained"
            color="primary"
            onClick={onClick}
        >
        Search
    </Button>;
}

SearchButton.propTypes = {
    setSearchedLocation: PropTypes.func.isRequired,
    locationInput: PropTypes.string
};