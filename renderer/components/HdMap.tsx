import React, { useRef, useState, useEffect } from "react"


import * as ol from "ol";
import MapContext from "./context/MapContext";

const Map = ({ children, zoom, center }) => {
    //지도 객체 관련 상태 저장!!
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount - 구성요소가 마운트되면 맵개체를 초기화하고 현재 상태로 저장
  // useEffect를 사용하여 컴포넌트가 마운트될 때, ol.Map 객체를 생성하고 지도를 초기화
  useEffect(() => {
    // options 객체에는 view, layers, controls, overlays 등의 옵션을 설정하고, 
    //ol.Map 생성자에 이를 전달합니다. mapObject에 생성된 ol.Map 객체를 저장하고, 
    //mapRef.current를 통해 해당 지도를 화면에 출력합니다. 
    //setMap 함수를 사용하여 지도 객체를 상태에 저장합니다.
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };

    let mapObject = new ol.Map(options);
    //html 타겟
    mapObject.setTarget(mapRef.current);


    // 다 집어넣음
    setMap(mapObject);

    //마운트가 해제되면 맵을 폐기하는, return 구문을 사용하여 컴포넌트가 unmount될 때, 지도 객체를 해제
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  //useEffect를 사용하여 zoom이 변경될 때, map.getView().setZoom() 메서드를 사용하여 지도를 확대/축소
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  //useEffect를 사용하여 center가 변경될 때, map.getView().setCenter() 메서드를 사용하여 지도의 중심 좌표를 변경
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])

  return (
    // MapContext.Provider 컴포넌트를 사용하여 map 객체를 하위 컴포넌트에서 공유할 수 있도록 합니다. 
    //mapRef를 사용하여 지도를 출력하고, children을 렌더링
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
      <style jsx>{`
      .ol-map {
    min-width: 600px;
    min-height: 500px;
    margin: 50px;
    height: 500px;
    width: "100%";
  }
  .ol-control {
    position: absolute;
    background-color: rgba(255,255,255,0.4);
    border-radius: 4px;
    padding: 2px;
  }
  .ol-full-screen {
    top: .5em;
    right: .5em;
  }
        `}</style>
    </MapContext.Provider>
  )
}
export default Map;
