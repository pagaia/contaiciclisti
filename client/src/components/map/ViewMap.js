import React from 'react';
import './ViewMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';

import Markers from './Markers';

const ViewMap = (props) => {
    return (
        <MapContainer
            center={[41.883446, 12.475011]}
            zoom={10}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Icons made by <a href="https://github.com/pointhi/leaflet-color-markers" title="leaflet-color-markers">leaflet-color-markers</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers />
        </MapContainer>
    );
};

export default React.memo(ViewMap);
