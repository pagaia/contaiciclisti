import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { OrangeIcon, GrayIcon } from './OrangeIcon';
// import MarkerClusterGroup from "react-leaflet-markercluster";
// require("react-leaflet-markercluster/dist/styles.min.css");

function Markers() {
    const { devices } = useSelector((state) => state.devices);

    if (!devices?.length) {
        return null;
    }

    const markers = devices.map((device) => {
        const { channelId, name, active } = device.properties;
        return (
            <Marker
                key={channelId}
                position={[
                    device.geometry.coordinates[1],
                    device.geometry.coordinates[0],
                ]}
                icon={active ? OrangeIcon : GrayIcon}
            >
                <Popup
                    position={[
                        device.geometry.coordinates[1],
                        device.geometry.coordinates[0],
                    ]}
                >
                    <div>
                        <h2>{name}</h2>
                        <div>{device.properties.description}</div>
                        <div>
                            <Link to={`/devices/${channelId}`}>
                                <FormattedMessage id="link.go-to-page" />
                            </Link>
                        </div>
                    </div>
                </Popup>
            </Marker>
        );
    });

    // return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
    return markers;
}

export default Markers;
