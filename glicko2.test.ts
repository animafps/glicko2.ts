import { Glicko2, Player, Race } from './glicko2'

describe('Glicko2 Class', () => {
	test('Is Glicko2 an object when initialized', () => {
		expect(typeof new Glicko2()).toBe('object')
	})

	test('Create player', () => {
		const Glicko = new Glicko2()
		const player = Glicko.makePlayer()
		expect(Glicko.players_index).toBe(1)
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
		expect(p1.getRating() === 1076.6804984311605).toBeTruthy()
	})

	test.todo('Make race')

	test.todo('Remove players')

	test.todo('Clean previous matches')

	test.todo('Calculate player ratings')

	test.todo('Add result')

	test.todo('Create internal player when id is defined')
})

describe('Player class', () => {
	test('Is Player an object when initialized', () => {
		expect(typeof new Player(1, 1, 1, 1)).toBe('object')
	})

	test.todo('Update rank')

	test.todo('Get rating')

	test.todo('Get RD')

	test.todo('Set RD')

	test.todo('Get vol')

	test.todo('Set vol')

	test.todo('Get Ratings')

	test.todo('Add result')

	test.todo('Has played')

	test.todo('Old procedure')

	test.todo('new procedure mod')

	test.todo('Old procedure simple')
})

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
