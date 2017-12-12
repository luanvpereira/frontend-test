require('../scss/app.scss');
import _ from 'lodash';
import { RankingComponent } from './components/ranking-component/ranking-component';

let Components = [
	RankingComponent
]

window.addEventListener('load', () => {
	_.map(Components, (Component) => {
		let newComponent = new Component();

		if('init' in newComponent && typeof newComponent.init == 'function') {
			newComponent.init();
		}
	})
}, false);