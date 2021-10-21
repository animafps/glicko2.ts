import { Player } from './player'

/**
 * The class for a Race which is a match that includes more than 2 competitors
 */
export class Race {
	/**
	 * Array of the matches and outcomes based on the race results
	 */
	public matches: [Player, Player, number][] = []
	/**
	 * @param results An ordered array of the race results with the winner in index 0, for all the players who tied on result they go into the same array
	 * @example
	 * ```ts
	 * const race = new Race([[player1], [player2, player3], [player4]])
	 * ```
	 */
	constructor(results: Player[][]) {
		this.matches = this.computeMatches(results)
	}

	/**
	 * @returns An array of the matches within the race in the format [{@link Player}, {@link Player}, placement][]
	 */
	public getMatches(): [Player, Player, number][] {
		return this.matches
	}

	/**
	 * Turns an array of race results to an array of matches and outcomes
	 * @param results An ordered array of the race results with the winner in index 0
	 * @returns An array of matches and outcomes based on the race results. [{@link Player}, {@link Player}, placement][]
	 */
	public computeMatches(results: Player[][]): [Player, Player, number][] {
		const players: { player: Player; position: number }[] = []
		let position = 0

		results.forEach((rank) => {
			position += 1
			rank.forEach((player: Player) => {
				players.push({ player: player, position: position })
			})
		})

		function computeMatches(
			players: { player: Player; position: number }[]
		): [Player, Player, number][] {
			if (players.length === 0) return []

			const player1 = players.shift() ?? {
				player: new Player(321, 321, 321, 321),
				position: 1,
			}
			const player1_results = players.map((player2) => {
				return [
					player1.player,
					player2.player,
					player1.position < player2.position ? 1 : 0.5,
				]
			})

			return player1_results.concat(computeMatches(players)) as [
				Player,
				Player,
				number
			][]
		}

		return computeMatches(players)
	}
}
