import React from "react";
const Layers = ({ children }) => {
  return (<div>{children}</div>);
};
export default Layers;
//TileLayer 및 VectorLayer 구성 요소는 보시다시피 매우 유사합니다. 
//둘 다 useEffect를 사용하여 레이어를 초기화하고 컨텍스트에서 지도 객체 의 addLayer를 호출하여 자신을 지도에 추가합니다.

//그리고 맵과 마찬가지로 레이어는 마운트 해제 시 맵에서 자체적으로 제거됩니다. 
//소품에 추가하려는 경우 OpenLayers API에서 초기화를 위해 전달할 수 있는 더 많은 옵션이 있지만 단순성을 위해 예제에서 허용하는 몇 가지 소품만 있습니다.