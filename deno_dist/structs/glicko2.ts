import { newProcedure, volatilityArgs } from '../algorithms/volatility.ts'
import { Player } from './player.ts'
import { Race } from './race.ts'
import { Team } from './team.ts'

/**
 * The main class of the rating system
 */
export class Glicko2 {
	/**
	 * Internal default tau value for new players
	 */
	private _tau
	/**
	 * Internal default rating in glicko format for new players
	 */
	private _default_rating
	/**
	 * Internal default rating deviation for new players
	 */
	private _default_rd
	/**
	 * Internal default volatility for new players
	 */
	private _default_vol
	/**
	 * An object of all the players cached with their key as their id
	 * @default {}
	 */
	private players: Record<string, Player> = {}
	/**
	 * The number of players in the record
	 * @default 0
	 */
	private players_index = 0
	/**
	 * The internal default volatility algorithm used by the Glicko2 object when making new players
	 */
	private _volatilityAlgorithm: (
		v: number,
		delta: number,
		{ vol, tau, rd, rating }: volatilityArgs
	) => number
	constructor(
		settings: {
			/**
			 * The system constant, which constrains the change in volatility over time
			 * @default 0.5
			 */
			tau: number
			/**
			 * Base rating
			 * @default 1500
			 */
			rating: number
			/**
			 * Base volatility
			 * The volatility measure indicates the degree of expected fluctuation in a player’s rating
			 * @default 0.06
			 */
			vol: number
			/**
			 * Base rating deviation
			 * @default 350
			 */
			rd: number
			/**
			 * The algorithm to calculate the volatility
			 * @default {@link newProcedure}
			 */
			volatilityAlgorithm: (
				v: number,
				delta: number,
				{ vol, tau, rd, rating }: volatilityArgs
			) => number
		} = {
			tau: 0.5,
			rating: 1500,
			rd: 350,
			vol: 0.06,
			volatilityAlgorithm: newProcedure,
		}
	) {
		this._tau = settings.tau

		this._default_rating = settings.rating

		this._default_rd = settings.rd

		this._default_vol = settings.vol

		this._volatilityAlgorithm = settings.volatilityAlgorithm
	}

	/**
	 * @returns A {@link Race} object from the results
	 */
	public makeRace(results: Player[][]): Race {
		return new Race(results)
	}

	/**
	 * Removes all the players from the cache
	 */
	public removePlayers(): void {
		this.players = {}
		this.players_index = 0
	}

	/**
	 * @returns A object with the player index id as the key and the {@link Player} object as the member
	 */
	public getPlayers(): Record<string, Player> {
		return this.players
	}

	/**
	 * Removes all of the previous matches from each of the players objects
	 */
	public cleanPreviousMatches(): void {
		for (let i = 0; i < Object.keys(this.players).length; i++) {
			this.players[i].adv_ranks = []
			this.players[i].adv_rds = []
			this.players[i].outcomes = []
		}
	}

	/**
	 * Updates the ratings for all the players
	 */
	public calculatePlayersRatings(): void {
		const keys = Object.keys(this.players)
		for (let i = 0; i < keys.length; i++) {
			this.players[keys[i]].update_rank()
		}
	}

	/**
	 * Creates players and match result to be taken in account for the new rankings calculation
	 * players must have ids, they are not created if it has been done already.
	 * @param player1 The first player
	 * @param player2 The second player
	 * @param outcome The outcome for the first player: 0 = defeat, 1 = victory, 0.5 = draw
	 * @returns An object of the new player objects
	 */
	public addMatch(
		player1: { rating: number; rd: number; vol: number; id: number },
		player2: { rating: number; rd: number; vol: number; id: number },
		outcome: matchResult | number
	): { pl1: Player; pl2: Player } {
		const pl1 = this._createInternalPlayer(
			player1.rating,
			player1.rd,
			player1.vol,
			player1.id
		)
		const pl2 = this._createInternalPlayer(
			player2.rating,
			player2.rd,
			player2.vol,
			player2.id
		)
		this.addResult(pl1, pl2, outcome)
		return { pl1: pl1, pl2: pl2 }
	}

	/**
	 * Creates a new {@link Player} and adds it to the cache
	 * We do not expose {@link Glicko2._createInternalPlayer} directly in order to prevent the assignation of a custom player id whose uniqueness could not be guaranteed
	 * @returns A {@link Player} object of the new player
	 */
	public makePlayer(rating?: number, rd?: number, vol?: number): Player {
		return this._createInternalPlayer(rating, rd, vol)
	}

	private _createInternalPlayer(
		rating?: number,
		rd?: number,
		vol?: number,
		id?: number
	) {
		if (id === undefined) {
			id = this.players_index
			this.players_index = this.players_index + 1
		} else {
			//We check if the player has already been created
			const candidate = this.players[id]
			if (candidate !== undefined) {
				return candidate
			}
		}
		const player = new Player(
			rating || this._default_rating,
			rd || this._default_rd,
			vol || this._default_vol,
			this._tau
		)
		const playerProto = Object.getPrototypeOf(player)

		// Set this specific Player's `defaultRating`. This _has_ to be done
		// here in order to ensure that new `Glicko2` instances do not change
		// the `defaultRating` of `Player` instances created under previous
		// `Glicko2` instances.
		playerProto.defaultRating = this._default_rating

		// Same reasoning and purpose as the above code regarding
		// `defaultRating`
		playerProto.volatilityAlgorithm = this._volatilityAlgorithm

		// Since this `Player`'s rating was calculated upon instantiation,
		// before the `defaultRating` was defined above, we much re-calculate
		// the rating manually.
		player.setRating(rating || this._default_rating)

		player.id = id
		player.adv_ranks = []
		player.adv_rds = []
		player.outcomes = []
		this.players[id] = player
		return player
	}

	/**
	 * Add a match result to be taken in account for the new rankings calculation
	 * @param player1 The first player
	 * @param player2 The second player
	 * @param outcome The outcome of the first player : 0 = defeat, 1 = victory, 0.5 = draw
	 */
	public addResult(
		player1: Player,
		player2: Player,
		outcome: matchResult | number
	): void {
		player1.addResult(player2, outcome)
		player2.addResult(player1, 1 - outcome)
	}

	/**
	 * Gets all the matches from the race(if is an instance of one), calculates player ratings
	 * @example
	 * ```ts
	 * Glicko2.updateRatings([
	 *  [Player1, Player2, 1],
	 *  [Player2, Player4, 0],
	 *  [Player3, Player1, 1],
	 * 	[Team1, Team2, 0],
	 * 	race
	 * ]);
	 * ```
	 */
	public updateRatings(matches: (playerMatch | Race | teamMatch)[]): void {
		this.cleanPreviousMatches()
		matches.forEach((match) => {
			if (match instanceof Race) {
				match
					.getMatches()
					.forEach((val) => this.addResult(val[0], val[1], val[2]))
			} else if (
				match[0] instanceof Player &&
				match[1] instanceof Player
			) {
				this.addResult(match[0], match[1], match[2])
			} else {
				this.getTeamMatches(match as teamMatch).forEach((val) =>
					this.addResult(val[0], val[1], val[2])
				)
			}
		})

		this.calculatePlayersRatings()
	}

	/**
	 * Gets an array of matches between 2 teams and their composite player object
	 */
	public getTeamMatches(match: teamMatch) {
		const finalMatches: playerMatch[] = []
		const team1Composite = match[0].makeCompositeOpponent()
		const team2Composite = match[1].makeCompositeOpponent()
		match[0].getPlayers().forEach((val) => {
			finalMatches.push([val, team1Composite, match[2]])
		})
		match[1].getPlayers().forEach((val) => {
			finalMatches.push([val, team2Composite, 1 - match[2]])
		})
		return finalMatches
	}
}

export type playerMatch = [Player, Player, matchResult | number]
export type teamMatch = [Team, Team, matchResult | number]

export enum matchResult {
	WIN = 1,
	LOSS = 0,
	DRAW = 0.5,
}
