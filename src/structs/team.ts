import { Player } from '..'

/**
 * The class for teams
 */
export class Team {
	private players: Player[]
	private rd = () =>
		this.players.reduce((prev, current) => current.getRd() + prev, 0) /
		this.players.length
	private rating = () =>
		this.players.reduce((prev, current) => current.getRating() + prev, 0) /
		this.players.length

	public constructor(players: Player[] = []) {
		this.players = players
	}

	/**
	 * Gets the avg rating deviation of the players in the team
	 */
	public getRd() {
		return this.rd()
	}

	/**
	 * Gets the avg rating of the players in the team
	 */
	public getRating() {
		return this.rating()
	}

	/**
	 * Gets the full array of players in the team
	 */
	public getPlayers() {
		return this.players
	}

	/**
	 * Makes a composite {@link Player} to use in {@link Glicko2.getTeamMatches}
	 */
	public makeCompositeOpponent() {
		return new Player(this.rating(), this.rd(), 0, 0)
	}

	/**
	 * Adds a {@link Player} to the team
	 */
	public addPlayer(player: Player) {
		this.players.push(player)
	}

	/**
	 * Removes a {@link Player} from the team
	 */
	public removePlayer(player: Player) {
		this.players = this.players.filter((val) => val !== player)
	}
}
