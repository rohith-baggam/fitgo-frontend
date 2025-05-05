import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LiveCoordinateMarker = () => {
  const [currentCoord, setCurrentCoord] = useState(null);

  useEffect(() => {
    const fetchLatestCoordinate = () => {
      fetch("http://localhost:8080/get-latest-co-ordinate-api?batchId=20", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0NTQ5MzI0NywiZXhwIjoxODg1MTMyNzA3MDA1MTZ9.o5fRVkzP5idnqsBM9veyhUJ6o7NmZPw3kQYOvV95KEI`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const newCoord = {
            lat: data.latitude,
            lng: data.longitude,
          };
          setCurrentCoord(newCoord);
        })
        .catch((error) =>
          console.error("Error fetching latest coordinate:", error)
        );
    };

    fetchLatestCoordinate(); // Initial fetch
    const interval = setInterval(fetchLatestCoordinate, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!currentCoord) {
    return <div>Loading live coordinate...</div>;
  }

  return (
    <MapContainer
      center={currentCoord}
      zoom={18}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={currentCoord}>
        <Popup>
          Live Location
          <br />
          Lat: {currentCoord.lat}, Lng: {currentCoord.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveCoordinateMarker;
