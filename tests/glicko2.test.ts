import { Glicko2 } from '../src/structs/glicko2'
import { Player } from '../src/structs/player'

describe('Glicko2 Class', () => {
	test('Is Glicko2 an object when initialized', () => {
		expect(typeof new Glicko2()).toBe('object')
	})

	test('Create player', () => {
		const Glicko = new Glicko2()
		const player = Glicko.makePlayer()
		expect(Object.keys(Glicko.getPlayers()).length).toBe(1)
		expect(JSON.stringify(Glicko.getPlayers())).toBe(
			JSON.stringify({
				'0': player,
			})
		)
	})

	test('Add match', () => {
		const Glicko = new Glicko2()
		const match = Glicko.addMatch(
			{ rating: 1500, rd: 250, vol: 0.06, id: 1 },
			{ rating: 1500, rd: 250, vol: 0.06, id: 2 },
			1
		)
		type Match = {
			pl1: Player
			pl2: Player
		}
		expect(match).toMatchObject<Match>({ ...match })
	})

	test('Update ratings', () => {
		const Glicko = new Glicko2()
		const p1 = Glicko.makePlayer()
		const p2 = Glicko.makePlayer()
		Glicko.updateRatings([[p1, p2, 0]])
		expect(p1.getRating() === 1337.6891060937023).toBeTruthy()
	})

	test.todo('Make race')

	test.todo('Remove players')

	test.todo('Clean previous matches')

	test.todo('Calculate player ratings')

	test.todo('Add result')

	test.todo('Create internal player when id is defined')
})
