import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MAP_OPTIONS, { TILE_LAYER } from "./map.options";
import { makeStyles } from "@material-ui/core/styles";

export default function Map() {
  const classes = useStyles();
  return (
    <MapContainer
      scrollWheelZoom={false}
      className={classes.map}
      {...MAP_OPTIONS}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={TILE_LAYER}
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

const useStyles = makeStyles(() => ({
  map: { height: "100%", width: "100%" },
  popup: { minWidth: 300 },
}));
