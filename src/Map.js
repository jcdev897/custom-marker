import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import geoJson from "./geo.json";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNrNXk3dXh6NzAwbncza3A1eHlpY2J2bmoifQ.JRy79QqtwUTYHK7dFUYy5g";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

const Map = () => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-87.65, 41.84],
      zoom: 10,
    });

    geoJson.features.forEach((feature) => {
      const ref = React.createRef();
      ref.current = document.createElement("div");
      
      ReactDOM.render(
        <Marker onClick={markerClicked} feature={feature} />,
        ref.current
      );

      new mapboxgl.Marker(ref.current)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  const markerClicked = (title) => {
    window.alert(title);
  };

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
