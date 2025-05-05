import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon path for older Leaflet versions
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// ✅ Custom icon using image from public folder
const movingIcon = new L.Icon({
  iconUrl: "/8704510.png", // image located in public/8704510.png
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapWithPath = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = () => {
      fetch("http://localhost:8080/co-ordinates-batch-api/?batchId=20", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0NTQ5MzI0NywiZXhwIjoxODg1MTMyNzA3MDA1MTZ9.o5fRVkzP5idnqsBM9veyhUJ6o7NmZPw3kQYOvV95KEI`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((item) => ({
            lat: item.latitude,
            lng: item.longitude,
          }));
          setCoordinates(formatted);
        })
        .catch((error) => console.error("Error fetching coordinates:", error));
    };

    fetchCoordinates();
    const interval = setInterval(fetchCoordinates, 1000);
    return () => clearInterval(interval);
  }, []);

  if (coordinates.length === 0) {
    return <div>Loading map...</div>;
  }

  const lastCoordinate = coordinates[coordinates.length - 1];

  return (
    <MapContainer
      center={lastCoordinate}
      zoom={18}
      style={{ height: "600px", width: "100%" }}
    >
      {/* ✅ CartoDB Positron Basemap */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
      />

      {/* Path as blue polyline */}
      <Polyline positions={coordinates} color="blue" />

      {/* Small circle markers at each coordinate except last */}
      {coordinates.slice(0, -1).map((pos, idx) => (
        <CircleMarker
          key={idx}
          center={pos}
          radius={4}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 1 }}
        />
      ))}

      {/* Last coordinate with custom icon */}
      <Marker position={lastCoordinate} icon={movingIcon}>
        <Popup>
          Last Position
          <br />
          Lat: {lastCoordinate.lat}, Lng: {lastCoordinate.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithPath;
