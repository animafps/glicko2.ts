import { Player } from '../src/structs/player'
import { Race } from '../src/structs/race'

describe('Race class', () => {
	const player1 = new Player(1500, 350, 0.06, 0.5)
	const player2 = new Player(1500, 350, 0.06, 0.5)
	const player3 = new Player(1500, 350, 0.06, 0.5)
	test('Create a race with no equal result', () => {
		expect(
			JSON.stringify(new Race([[player1], [player2], [player3]]).matches)
		).toBe(
			JSON.stringify([
				[player1, player2, 1],
				[player1, player3, 1],
				[player2, player3, 1],
			])
		)
	})

	test('Create a race with players with equal result', () => {
		expect(
			JSON.stringify(
				new Race([[player1], [player2, player3]]).getMatches()
			)
		).toBe(
			JSON.stringify([
				[player1, player2, 1],
				[player1, player3, 1],
				[player2, player3, 0.5],
			])
		)
	})
})
