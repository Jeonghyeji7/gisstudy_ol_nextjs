import React, { useRef, useState, useEffect } from "react"
import * as ol from "ol";
import MapContext from "../context/MapContext";

const Map = ({ children, zoom, center }) => {
  //* 지도 객체 관련 상태 저장!!
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  //* on component mount - useEffect를 사용하여 컴포넌트가 마운트될 때, ol.Map 객체를 생성하고 지도를 초기화
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };
    // 지도 객체 생성
    let mapObject = new ol.Map(options);
    // (Map 객체가 생성된 후에) 지도를 DOM요소에 연결하는데 사용한다
    mapObject.setTarget(mapRef.current);

    //setMap 함수를 사용하여 지도 객체를 상태에 저장
    setMap(mapObject);

    //컴포넌트가 마운트 해제될 때 `setTarget` 호출을 사용하여 지도 객체와 DOM 요소 간의 연결을 해제
    return () => mapObject.setTarget(undefined);
  }, []);

  //* useEffect를 사용하여 zoom이 변경될 때, map.getView().setZoom() 메서드를 사용하여 지도를 확대/축소
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  //* useEffect를 사용하여 center가 변경될 때, map.getView().setCenter() 메서드를 사용하여 지도의 중심 좌표를 변경
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])

  return (
    // MapContext.Provider 컴포넌트를 사용하여 map 객체를 하위 컴포넌트에서 공유할 수 있도록 함
    <MapContext.Provider value={{ map }}>
      {/* mapRef를 사용하여 지도를 출력하고, children을 렌더링 */}
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
