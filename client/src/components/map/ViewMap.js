import React from "react";
import "./ViewMap.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CounterIcon } from "./CounterIcon";
import { Link } from "react-router-dom";

const ViewMap = ({ devices }) => {
  console.log(devices);

  return (
    <MapContainer
      center={[41.804547, 12.3412755]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors Icons made by <a href="https://icon54.com/" title="Pixel perfect">Pixel perfect</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices?.map?.((device) => {
        console.log(device);
        const { name } = device.properties;
        return (
          <Marker
            key={name}
            position={[
              device.geometry.coordinates[1],
              device.geometry.coordinates[0],
            ]}
            icon={CounterIcon}
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
                  <Link to={`/device/${name}`}>Go to the page</Link>
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
