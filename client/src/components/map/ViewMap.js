import React from "react";
import "./ViewMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { OrangeIcon } from "./OrangeIcon";
import { Link } from "react-router-dom";

const ViewMap = ({ devices }) => {
  return (
    <MapContainer
      center={[41.883446, 12.475011]}
      zoom={11}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.         Icons made by <a href="https://github.com/pointhi/leaflet-color-markers" title="leaflet-color-markers">leaflet-color-markers</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices?.map?.((device) => {
        const { channelId, name } = device.properties;
        return (
          <Marker
            key={channelId}
            position={[
              device.geometry.coordinates[1],
              device.geometry.coordinates[0],
            ]}
            icon={OrangeIcon}
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
                  <Link to={`/devices/${channelId}`}>Go to the page</Link>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ViewMap;
