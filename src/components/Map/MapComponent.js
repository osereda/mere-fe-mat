import React from "react";
import Leaflet from "leaflet";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "./constants";

let DefaultIcon = Leaflet.icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

function MapComponent({ coords }) {
    return (
        <MapContainer
            classsName="map"
            center={coords}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "300px" ,  marginTop: "20px"}}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={{ lat: coords[0], lng: coords[1] }}
                icon={icon}
            >
                <Popup>
                    <span>{coords}</span>
                </Popup>
            </Marker>
            <SetViewOnClick coords={coords} />
        </MapContainer>
    );
}

export default MapComponent;
