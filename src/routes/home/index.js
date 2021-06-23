import { h } from 'preact';
import style from './style.css';
import GoogleMap from '../../components/googleMap';

const Home = () => {

	return(
		<div class={style.home}>
			<h1>Home</h1>
			<GoogleMap 
				zoom={4}
			/>
		</div>
	)
}

export default Home;