import React from "react";
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";

export default function CoordinatesList({allCoordinates, setAllCoordinates}) {
    return <div>
        {Object.keys(allCoordinates).map(coordinateKey => <CoordinateItem
            coordinate={allCoordinates[coordinateKey]}
            setAllCoordinates={setAllCoordinates}
            allCoordinates={allCoordinates}>
            key={coordinateKey}
        </CoordinateItem>)}
    </div>;
}

CoordinatesList.propTypes = {
    allCoordinates: PropTypes.object.isRequired,
    setAllCoordinate: PropTypes.func.isRequired
};


function CoordinateItem({setAllCoordinates, allCoordinates, coordinate}) {
    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>{Object.values(coordinate)[0]}</div>
        <CoordinateButton
            setAllCoordinates={setAllCoordinates}
            allCoordinates={allCoordinates}
            coordinate={coordinate}
        />
    </div>;
}

CoordinateItem.propTypes = {
    coordinate: PropTypes.object,
    allCoordinates: PropTypes.object.isRequired,
    setAllCoordinate: PropTypes.func.isRequired
};


function CoordinateButton({setAllCoordinates, allCoordinates, coordinate}) {
    const allOtherCoordinates = delete allCoordinates[Object.keys(coordinate)[0]];
    const onClick = () => setAllCoordinates(allOtherCoordinates);
    return <Button
        className="search-button"
        variant="contained"
        color="primary"
        onClick={onClick}
    >
        Remove
    </Button>;
}

CoordinateButton.propTypes = {
    coordinate: PropTypes.object,
    allCoordinates: PropTypes.object.isRequired,
    setAllCoordinate: PropTypes.func.isRequired
};