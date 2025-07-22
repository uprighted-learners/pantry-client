import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Home.css'

<<<<<<< HEAD

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FubmVkZG9jcmV3IiwiYSI6ImNtZGNpd2FhcDE5NWQyaXB6eTI5NzhhbzQifQ.tKcPGkwXMJC3Id3b_09fhQ';

const Map = ({ pantries, setSelectedPantry }) => {
  const mapContainerRef = useRef(null);  //DOM container ref
  const mapRef = useRef(null); //Map isntance ref

  const [lng, setLng] = useState(-84.3733);
  const [lat, setLat] = useState(33.7550);
  const [zoom, setZoom] = useState(10);
  const [mapLoaded, setMapLoaded] = useState(false);

  // const locations = [
  //   { lng: -84.3537, lat: 33.7743 },
  //   { lng: -84.3287, lat: 33.8186 },
  //   { lng: -84.49421, lat: 33.66182 },
  //   { lng: -84.45113182883547, lat: 33.778164832266384 },
  //   { lng: -84.4247, lat: 33.8002 },

  // ];
=======
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FubmVkZG9jcmV3IiwiYSI6ImNtZGNpd2FhcDE5NWQyaXB6eTI5NzhhbzQifQ.tKcPGkwXMJC3Id3b_09fhQ';

const Map = ({ selectedPantry, onMarkerClick }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [lng, setLng] = useState(-84.3733);
  const [lat, setLat] = useState(33.7550);
  const [zoom, setZoom] = useState(10);
  const [locations, setLocations] = useState([]);
  const markersRef = useRef([]); 
>>>>>>> 66eec55eaffe948e67c290b1872f99a12d145a6f

  // Fetch pantry locations
  useEffect(() => {
  if (mapRef.current || !mapContainerRef.current) return;  // initialize only once

<<<<<<< HEAD
    const map = new mapboxgl.Map({
=======
  // Initialize map
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
>>>>>>> 66eec55eaffe948e67c290b1872f99a12d145a6f
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-84.3733, 33.7550],
      zoom: zoom,
    });

       mapRef.current = map;
       console.log('Map initiialized:', map);

       map.on('load', () => {
        console.log('Map loaded');
        map.resize();
        setMapLoaded(true);
       });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

<<<<<<< HEAD
    return () => map.remove();
  }, []);

  // useEffect(() => {
  //   if (mapRef.current) {
  //   mapRef.current.resize();
  // }
  // });
=======
    return () => mapRef.current.remove();
  }, []); // Empty dependency to run only once
>>>>>>> 66eec55eaffe948e67c290b1872f99a12d145a6f

  // Create markers and handle marker click
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !pantries.length) return;

<<<<<<< HEAD
    let markers = [];

    console.log("Pantries passed to Map:", pantries);

    pantries.forEach((pantry) => {
       console.log("Pantry coords:", pantry.lat, pantry.lng);

    if (pantry.lng && pantry.lat) {
      const lng = parseFloat(pantry.lng);
      const lat = parseFloat(pantry.lat);

      if (!isNaN(lng) && !isNaN(lat)) {
      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

        marker.getElement().addEventListener('click', () => {
          setSelectedPantry(pantry);
        });
=======
    // Clean up previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    locations.forEach((location) => {
      // Ensure valid coordinates on mongo
      if (isNaN(location.lng) || isNaN(location.lat)) {
        console.error(`Invalid coordinates for pantry with ID: ${location._id}`);
        return;
      }

      const markerColor = location._id === selectedPantry ? 'purple' : 'gold';
      const marker = new mapboxgl.Marker({
        color: markerColor,
      })
        .setLngLat([location.lng, location.lat])
        .addTo(mapRef.current);

      // Add marker to the marker reference array
      markersRef.current.push(marker);

      // Event listener for click
      marker.getElement().addEventListener('click', () => {
        onMarkerClick(location);
        mapRef.current.flyTo({ center: [location.lng, location.lat], zoom: 14 });
      });
    });
  }, [locations, selectedPantry, onMarkerClick]); 
>>>>>>> 66eec55eaffe948e67c290b1872f99a12d145a6f

        markers.push(marker);
      }
    }
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [pantries, mapLoaded, setSelectedPantry]);


  return (
<<<<<<< HEAD
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div className="sidebar" style={{ padding: '0.5rem' }}>
        <h2 id="bankTitle">Find a Pantry</h2>
        <p id="longlat">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
=======
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2em', paddingRight: '2em' }}>
        <div className="sidebar" style={{ padding: '0.5rem' }}>
          <h2 id="bankTitle">Find a Pantry</h2>
        </div>
        <SearchBar onSearch={findClosestPantry} /> {/* Search bar added */}
        <div
          ref={mapContainerRef}
          style={{ width: '90%', minHeight: '500px', flexGrow: 1 }}
        />
        <p id="lnglat">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
>>>>>>> 66eec55eaffe948e67c290b1872f99a12d145a6f
      </div>
      <div
        ref={mapContainerRef}
        className="mapContainer"
        style={{ width: '100%', minHeight: '600px', flexGrow: 1, border: '2px solid red' }}
      ></div>
    </div>
  );
};

export default Map;