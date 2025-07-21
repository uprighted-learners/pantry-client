// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './Home.css'

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FubmVkZG9jcmV3IiwiYSI6ImNtZDNwemMwYTA3Nngya29paGpkZGd1cTQifQ.zqgZy0q8PJVH9rA7VdSDog';

// const Map = () => {
//   const mapContainerRef = useRef(null);
//   const [lng, setLng] = useState(-84.3733);
//   const [lat, setLat] = useState(33.7550);
//   const [zoom, setZoom] = useState(10);

//   const locations = [
//     { lng: -84.3537, lat: 33.7743 },
//     { lng: -84.3287, lat: 33.8186 },
//     { lng: -84.49421, lat: 33.66182 },
//     { lng: -84.45113182883547, lat: 33.778164832266384 },
//     { lng: -84.4247, lat: 33.8002 },

//   ];

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.on('move', () => {
//       setLng(map.getCenter().lng.toFixed(4));
//       setLat(map.getCenter().lat.toFixed(4));
//       setZoom(map.getZoom().toFixed(2));
//     });

//     locations.forEach(location => {
//       new mapboxgl.Marker()
//         .setLngLat([location.lng, location.lat])
//         .addTo(map);
//     });


//     return () => map.remove();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div>
//       <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2em', paddingRight: '2em' }}>
//       <div className="sidebar" style={{ padding: '0.5rem' }}>
//         <h2 id="bankTitle">Find a Pantry</h2>
//         <p id="longlat">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
//       </div>
//       <div
//         ref={mapContainerRef}
//         style={{ width: '100%', minHeight: '600px', flexGrow: 1 }}
//       />
//     </div>
//     </div>
//   );
// };

// export default Map;


import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Home.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FubmVkZG9jcmV3IiwiYSI6ImNtZDNwemMwYTA3Nngya29paGpkZGd1cTQifQ.zqgZy0q8PJVH9rA7VdSDog';

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

  useEffect(() => {
  if (mapRef.current || !mapContainerRef.current) return;  // initialize only once

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

       mapRef.current = map;
       console.log('Map initiialized:', map);

       map.on('load', () => {
        map.resize();
        setMapLoaded(true);
       });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
    mapRef.current.resize();
  }
  });

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !pantries.length) return;

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

        markers.push(marker);
      }
    }
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [pantries, mapLoaded, setSelectedPantry]);


  return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div className="sidebar" style={{ padding: '0.5rem' }}>
        <h2 id="bankTitle">Find a Pantry</h2>
        <p id="longlat">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
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