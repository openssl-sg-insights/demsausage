import GeoJSON from "ol/format/GeoJSON"
import Polygon from "ol/geom/Polygon"
import Draw from "ol/interaction/Draw"
// @ts-ignore
import { createBox, DrawEventType } from "ol/interaction/Draw.js"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import Map from "ol/Map"
import "ol/ol.css"
import OSM from "ol/source/OSM"
import VectorSource from "ol/source/Vector"
import View from "ol/View"
import * as React from "react"
import { IGeoJSON } from "../../redux/modules/interfaces"

export interface IProps {
    value: IGeoJSON | undefined
    onChange: (geojson: IGeoJSON) => void
}

type TComponentProps = IProps
class MapExtentChooser extends React.PureComponent<TComponentProps, {}> {
    private map: Map | undefined

    public componentDidMount() {
        this.map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM({
                        attributions: ['© <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap contributors</a>'],
                    }),
                }),
            ],
            target: "map",
            view: new View({
                center: [13668163.65, -2988993.54],
                zoom: 3,
            }),
        })

        if (this.props.value !== undefined) {
            let view = this.map.getView()
            // @ts-ignore
            const polygon = new Polygon(this.props.value.coordinates).transform("EPSG:4326", "EPSG:3857")
            // @ts-ignore
            view.fit(polygon, {
                size: this.map.getSize(),
            })
        }

        const source = this.createDrawingVectorLayer()
        this.createDrawingInteraction(source)
    }

    public render() {
        return <div id="map" style={{ width: 400, height: 300, paddingTop: 20, paddingBottom: 20 }} />
    }

    private createDrawingInteraction(source: VectorSource | null) {
        if (this.map !== undefined && source !== null) {
            const draw = new Draw({
                source,
                type: "Circle",
                geometryFunction: createBox(),
            })
            draw.on("drawstart", (event: DrawEventType) => {
                source.clear()
            })
            draw.on("drawend", (event: DrawEventType) => {
                const writer = new GeoJSON()
                const feature = writer.writeFeatureObject(event.feature, {
                    featureProjection: "EPSG:3857",
                    dataProjection: "EPSG:4326",
                })
                // @ts-ignore
                this.props.onChange(feature.geometry)
            })
            this.map.addInteraction(draw)
        }
    }

    private createDrawingVectorLayer() {
        if (this.map !== undefined) {
            let source
            if (this.props.value !== undefined) {
                source = new VectorSource({
                    wrapX: false,
                    features: new GeoJSON().readFeatures(this.props.value, { featureProjection: "EPSG:3857", dataProjection: "EPSG:4326" }),
                })
            } else {
                source = new VectorSource({ wrapX: false })
            }

            const vector = new VectorLayer({
                source,
            })
            vector.setProperties({ owner: "drawing-interaction" })

            this.map.addLayer(vector)
            return source
        }
        return null
    }
}

export default MapExtentChooser