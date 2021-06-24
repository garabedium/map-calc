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
			libraries: ["drawing"]
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
						google.maps.drawing.OverlayType.POLYGON
					]
				},
				polygonOptions: {
					draggable: true,
					editable: true
				}
			})

			drawingManager.setMap(map)
		})

		return(
			<div id="map" class={style.map}></div>
		)
	}
}

export default GoogleMap;