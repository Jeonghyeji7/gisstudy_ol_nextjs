import React, { createContext } from "react";
import { Map } from 'ol';

// const MapContext = new createContext();
// export default MapContext;

interface MapContextProps {
  map: Map | null;
}

const MapContext = createContext<MapContextProps>({
  map: null,
});

export default MapContext;
