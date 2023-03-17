import { useContext, useEffect } from "react";

import OLTileLayer from "ol/layer/Tile";
import MapContext from "../context/MapContext";



const TileLayer = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext); 
  //map가 변경되면 함수가 실행
  //지도 객체 없으면 함수 종료
  useEffect(() => {
    if (!map) return;
    
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);
  //마지막으로 null을 반환합니다. 이 컴포넌트는 실제로 렌더링되지 않고, 지도에 레이어를 추가하는 기능만 수행하기 때문입니다.
  return null;
};
export default TileLayer;