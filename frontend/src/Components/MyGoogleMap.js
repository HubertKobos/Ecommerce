import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { DistanceMatrixService } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 50.099629,
  lng: 21.573552,
};

function MyGoogleMap() {
  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        // DistanceMatrixService={}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyGoogleMap);
