require('../scss/app.scss');
import _ from 'lodash';
import { RankingComponent } from './components/rankingComponent';

let Components = [
	RankingComponent
]

window.addEventListener('load', () => {
	_.map(Components, (Component) => {
		return new Component();
	})
}, false);