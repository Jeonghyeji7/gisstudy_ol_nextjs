import React, {  useState } from 'react';
import {styled} from '@mui/material';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Map from '../components/HdMap';
import { fromLonLat, get } from 'ol/proj';
import Layers from '../components/layer/Layers';
import TileLayer from '../components/layer/TileLayer';
import VectorLayer from '../components/layer/VectorLayer';
import Controls from '../components/controls/Controls';
import FullScreenControl from '../components/controls/FullScreenControl';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import mapConfig from "../public/config.json";

const Root = styled('div')(({theme}) => {
    return {
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    };
})






let styles = {
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
  };


  const geojsonObject = mapConfig.geojsonObject;
  const geojsonObject2 = mapConfig.geojsonObject2;



function Home() {
    const [center, setCenter] = useState([-94.9065, 38.9884]);
    const [zoom, setZoom] = useState(9);
    const [showLayer1, setShowLayer1] = useState(true);
    const [showLayer2, setShowLayer2] = useState(true);




    return (
        <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer
              source={new OSM()}
              zIndex={0}
            />
            {showLayer1 && (
              <VectorLayer
                source={new VectorSource({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                style={styles.MultiPolygon}
              />
            )}
            {showLayer2 && (
              <VectorLayer
                source={new VectorSource({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
                style={styles.MultiPolygon}
              />
            )}
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
        <div>
          <input
            type="checkbox"
            checked={showLayer1}
            onChange={event => setShowLayer1(event.target.checked)}
          /> Johnson County
        </div>
        <div>
          <input
            type="checkbox"
            checked={showLayer2}
            onChange={event => setShowLayer2(event.target.checked)}
          /> Wyandotte County</div>
        </div>
    );
};

export default Home;
