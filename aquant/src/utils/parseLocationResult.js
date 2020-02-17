export function getCoordinatesFromBingMapObject(bingMapObject) {
    const coordinates = bingMapObject.resourceSets[0].resources.map(coordinate => coordinate.point.coordinates);
    return coordinates;
}

export function formatPushpin(pushpin, pushpinNumber) {
    return `&pp=${pushpin.join(',')};;${pushpinNumber}`;
}