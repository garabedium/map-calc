import { h } from 'preact';
import style from './style.css';
import { Loader } from '@googlemaps/js-api-loader';

// Generates Google Map via Maps Javascript API
const GoogleMap = (props) => {

	// Pre-render runs in node and has no access to globals available in browsers
	// 'npm run build' command returns error without check
	if (typeof window !== "undefined") {
		const apiKey = "AIzaSyBRbwPJXZdGotd7x0PJI4Jx5RnCo_IWC10";
		const defaultZoom = 3;
		let map;
		let zoom = props.zoom || defaultZoom;

		const loader = new Loader({ 
			apiKey: apiKey,
			libraries: ["drawing","geometry"]
		})

		loader.load().then(() => {
			map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: 37.09024, lng: -95.712891 },
				zoom: zoom
			})

			// Drawing Manager enables drawing tools on map
			// Drawing Tools API docs: https://developers.google.com/maps/documentation/javascript/examples/drawing-tools
			const drawingManager = new google.maps.drawing.DrawingManager({
				drawingControl: true,
				drawingControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER,
					drawingModes: [
						google.maps.drawing.OverlayType.POLYGON,
						google.maps.drawing.OverlayType.RECTANGLE
					]
				},
				polygonOptions: {
					draggable: true,
					editable: true
				},
				rectangleOptions: {
					draggable: true,
					editable: true
				}
			})

			drawingManager.setMap(map)

			// Calculate area of polygon or rectangle
			// Geometry Library: https://developers.google.com/maps/documentation/javascript/reference/geometry
			google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event){
				if (event.type == 'polygon'){
					const area = google.maps.geometry.spherical.computeArea(event.overlay.getPath())
				}
				if (event.type == 'rectangle'){
					var bounds = event.overlay.getBounds();
					const NE = bounds.getNorthEast()
					const SW = bounds.getSouthWest()
					const NW = new google.maps.LatLng(NE.lat(),SW.lng())
					const SE = new google.maps.LatLng(SW.lat(),NE.lng())
					const paths = [NE,NW,SW,SE,NE]
					const area = google.maps.geometry.spherical.computeArea(paths)
				}
			})

		})




		return(
			<div id="map" class={style.map}></div>
		)
	}
}

export default GoogleMap;