import { RankingComponent } from './ranking-component';

describe('RankingComponent', () => {
	it('Carregar fazenda.json', (done) => {
		let RankingComponentInstance = new RankingComponent();

		RankingComponentInstance.getFazendaData((resp) => {
			expect(resp.data.length).toBe(5);
			done();
		});
	})

	it('Corrigir dados fazenda.json', (done) => {
		let RankingComponentInstance = new RankingComponent();

		RankingComponentInstance.getFazendaData((resp) => {
			let fixData = RankingComponentInstance.fixData(resp.data);
			let fixed = true;

			for(let i = 0, max = fixData.length; i < max; i += 1) {
				let participant = fixData[i];

				if(!isNaN(participant.positive) && !isNaN(participant.negative)) {
					fixed = true;
				} else {
					fixed = false;
					break;
				}
			}

			expect(fixed).toBe(true);
			done()
		});
	})

	it('Pegar total de votos', (done) => {
		let RankingComponentInstance = new RankingComponent();

		RankingComponentInstance.getFazendaData((resp) => {
			resp.data = RankingComponentInstance.fixData(resp.data);
			let votes = RankingComponentInstance.getTotalVotes(resp.data);
			
			expect(votes).toBeGreaterThan(2)
			done()
		});
	})

	it('Calcular Porcentagem de cada participante', (done) => {
		let RankingComponentInstance = new RankingComponent();

		RankingComponentInstance.getFazendaData((resp) => {
			resp.data 	= RankingComponentInstance.fixData(resp.data);
			resp.total 	= RankingComponentInstance.getTotalVotes(resp.data);
			resp.data 	= RankingComponentInstance.calcPercentage(resp.data, resp.total);
			// console.log(resp.data)
			let isPercentage = true;

			for(let i = 0, max = resp.data.length; i < max; i += 1) {
				let participant = resp.data[i];

				if(participant.positive <= 100 &&  participant.negative <= 100) {
					isPercentage = true;
				} else {
					isPercentage = false;
					break;
				}
			}

			expect(isPercentage).toBe(true);
			done()
		});
	})
})