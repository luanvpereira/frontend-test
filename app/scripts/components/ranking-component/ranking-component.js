import _ from 'lodash';
import Ajax from '../../modules/ajax';

_.templateSettings.variable = "data";

export class RankingComponent {
	constructor() {
		this.UI = {
			$list: document.querySelector('.ranking-list')
		}

		this.fazendaData = '/fazenda.json';
	}

	getParticipantsTmpl() {
		return `
		<% _.forEach(data.participants, function(participant, i){  %>
			<div class="ranking-item" role="button" tabindex="<%= (i + 2) %>">
				<div class="ranking-tooltip">
					<div class="ranking-tooltip-box">
						<h4 class="ranking-tooltip-title">Gostam</h4>
						<p class="ranking-tooltip-percent"><%= participant.positive %>%</p>
					</div>

					<div class="ranking-tooltip-box">
						<h4 class="ranking-tooltip-title">Não gostam</h4>
						<p class="ranking-tooltip-percent"><%= participant.negative %>%</p>
					</div>
				</div>

				<div class="ranking-image-holder">
					<div class="ranking-image">
						<img src="<%= participant.picture %>" alt="<%= participant.name %>">
					</div>

					<span class="ranking-classification">
						<%= i+1 %>
					</span>
				</div>

				<div class="ranking-infos">
					<h3 class="ranking-name"><%= participant.name %></h3>
					<p class="ranking-description"><%= participant.description %></p>
				</div>
			</div>
		<% }) %>
		`
	}

	getFazendaData(cb) {
		Ajax({
			url: this.fazendaData,
			success: (response) => {
				response = JSON.parse(response)

				if(typeof cb == 'function') {
					cb(response)
				}
			}
		})
	}

	fixData(participants) {
		return _.map(participants, (participant) => {
			if(participant.positive && participant.negative) {
				participant.positive = parseFloat(participant.positive);
				participant.negative = parseFloat(participant.negative);
			} else {
				participant.positive = 0;
				participant.negative = 0;
			}
			return participant;
		});
	}

	getTotalVotes(participants) {
		let total = 0;

		_.each(participants, (participant) => {
			total += (participant.positive + participant.negative)
		});

		return total;
	}

	calcPercentage(participants, total) {
		return _(participants)
			.map(participant => {
				participant.positive = Math.floor((participant.positive * 100) / total);
				participant.negative = Math.floor((participant.negative * 100) / total);
				return participant;
			})
			.orderBy(['positive'], ['desc']).value();
	}

	_bindEvents() {
		let btns = this.UI.$list.querySelectorAll('.ranking-item');

		_.forEach(btns, (btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				e.currentTarget.focus();
			})
		})
	}

	init() {
		this.getFazendaData((response) =>  {
			response.data = this.fixData(response.data);
			response.total = this.getTotalVotes(response.data);
			response.data = this.calcPercentage(response.data, response.total);

			let template = _.template(this.getParticipantsTmpl());
			let proccessedTmpl = template({participants: response.data});

			this.UI.$list.innerHTML = proccessedTmpl;
			this._bindEvents();
		})
	}
}