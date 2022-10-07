import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import geoJson from "./geo.json";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNrNXk3dXh6NzAwbncza3A1eHlpY2J2bmoifQ.JRy79QqtwUTYHK7dFUYy5g";

const colors = {
  'area 1': "#f00000",
  'area 2': "#f30260",
  'area 3': "#033330",
  'area 4': "#f9f3077",
  'area 5': "#0f8f40",
  'area 6': "#fffff0",
  'area 7': "#f0f040",
  'area 8': "#f00600",
  }

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
      const marker = new mapboxgl.Marker({color: colors[feature.properties.title]})
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        );
      
      const markerDiv = marker.getElement();

      markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

      marker.addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
