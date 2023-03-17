import React, { useRef, useState, useEffect } from 'react';
import * as ol from 'ol';
import 'ol/ol.css';
import { OSM, XYZ } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';

const Map = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isMapConnected, setIsMapConnected] = useState(true);

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    const mapObject = new ol.Map({
      layers: [osmLayer],
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      }),
    });

    setMap(mapObject);

    return () => mapObject.setTarget(null);
  }, []);

  useEffect(() => {
    if (!map) return;

    if (isMapConnected) {
      map.setTarget(mapRef.current);
    } else {
      map.setTarget(null);
    }
  }, [isMapConnected, map]);

  const toggleMapConnection = () => {
    setIsMapConnected(!isMapConnected);
  };

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      <button onClick={toggleMapConnection}>
        {isMapConnected ? 'Disconnect Map' : 'Connect Map'}
      </button>
    </>
  );
};

export default Map;