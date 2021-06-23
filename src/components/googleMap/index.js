import { h } from 'preact';
import style from './style.css';
import { Loader } from '@googlemaps/js-api-loader';

// Generates Google Map via Maps Javascript API
const GoogleMap = (props) => {
  const apiKey = "AIzaSyBRbwPJXZdGotd7x0PJI4Jx5RnCo_IWC10";
  const defaultZoom = 3;
	let map;
  let zoom = props.zoom || defaultZoom;

	const loader = new Loader({ apiKey: apiKey })

	loader.load().then(() => {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: 37.09024, lng: -95.712891 },
			zoom: zoom
		})
	})

	return(
    <div id="map" class={style.map}></div>
	)
}

export default GoogleMap;