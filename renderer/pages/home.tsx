import React, { useState } from "react";
import { styled } from "@mui/material";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Map from "../components/map/HdMap";
import { fromLonLat, get } from "ol/proj";
import Layers from "../components/layer/Layers";
import TileLayer from "../components/layer/TileLayer";
import VectorLayer from "../components/layer/VectorLayer";
import Controls from "../components/controls/Controls";
import FullScreenControl from "../components/controls/FullScreenControl";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import mapConfig from "../public/config.json";
import TargetTest from "../components/TargetTest";
import styles from "../components/feature/Styles";
import {Icon} from "ol/style";
import {Point} from "ol/geom";
import {Feature} from "ol";
import {FeatureLike} from "ol/Feature";

const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  };
});


const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];



function addMarkers(lonLatArray) {
    let features = lonLatArray.map((item) => {
        let feature = new Feature({
            geometry: new Point(fromLonLat(item)),
        });
        feature.setStyle(styles.Icon);
        return feature;
    });
    return features;
}

function Home() {
    const [center, setCenter] = useState(mapConfig.center);

  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

    const [showMarker, setShowMarker] = useState(false);

    // FeatureLike은 OpenLayers에서 제공하는 타입으로, 벡터 데이터를 나타내는 ol/Feature 객체와 유사한 구조를 가진 객체를 의미합니다. 이 타입은 OpenLayers의 다양한 기능들과 호환성을 유지하면서, ol/Feature와 유사한 객체를 사용할 수 있게 해줍니다.

        // FeatureLike[]는 FeatureLike 객체들의 배열을 나타냅니다. 즉, 이 타입을 사용하면 OpenLayers의 벡터 데이터를 저장하고 관리하는 데 필요한 모든 속성들이 포함된 객체들의 배열을 다룰 수 있게 됩니다. 이렇게 함으로써 TypeScript는 올바른 타입 추론을 수행할 수 있으며, 코드의 안정성을 높일 수 있습니다.

    const [features, setFeatures] = useState<FeatureLike[]>(addMarkers(markersLonLat));

console.log((features))

    function vector({ features }) {
        return new VectorSource({
            features
        });
    }

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          {/* 기본 tile osm맵 */}
          <TileLayer source={new OSM()} zIndex={0} />
          {/* 백터 레이어 2개 */}
          {showLayer1 && (
            <VectorLayer
              source={
                new VectorSource({
                  features: new GeoJSON().readFeatures(geojsonObject, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })
              }
              style={styles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={
                new VectorSource({
                  features: new GeoJSON().readFeatures(geojsonObject2, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })
              }
              style={styles.MultiPolygon}
            />
          )}
            {showMarker && <VectorLayer source={new VectorSource({features: features})} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
        <hr />
        <div>
            <input
                type="checkbox"
                checked={showMarker}
                onChange={(event) => setShowMarker(event.target.checked)}
            />{" "}
            Show markers
        </div>
    </div>
  );
}

export default Home;
