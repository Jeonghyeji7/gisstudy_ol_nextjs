import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from "ol/style";
import mapConfig from "../../public/config.json";

export default {
    Point: new Style({
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: "magenta",
            }),
        }),
    }),
    Polygon: new Style({
        stroke: new Stroke({
            color: "blue",
            lineDash: [4],
            width: 3,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
    MultiPolygon: new Style({
        stroke: new Stroke({
            color: "blue",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
    Icon:new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: mapConfig.markerImage32,
        }),
    })
};