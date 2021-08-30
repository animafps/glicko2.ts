const scalingFactor = 173.7178;

/**
 * The class for a Race which is a match that includes more than 2 competitors
 */
export class Race {
    /**
     * Array of the matches and outcomes based on the race results
     */
    public matches: [Player, Player, number][] = [];
    /**
     * @param results An ordered array of the race results with the winner in index 0, for all the players who tied on result they go into the same array
     * @example
     * ```ts
     * const race = new Race([[player1], [player2, player3], [player4]])
     * ```
     */
    constructor(results: Player[][]) {
        this.matches = this.computeMatches(results);
    }

    /**
     * @returns An array of the matches within the race [Player, Player, ]
     */
    public getMatches(): [Player, Player, number][] {
        return this.matches;
    }

    /**
     * Turns an array of race results to an array of matches and outcomes
     * @param results An ordered array of the race results with the winner in index 0
     * @returns An array of matches and outcomes based on the race results
     */
    public computeMatches(results: Player[][]): [Player, Player, number][] {
        const players: { player: Player; position: number }[] = [];
        let position = 0;

        results.forEach((rank) => {
            position += 1;
            rank.forEach((player: Player) => {
                players.push({ player: player, position: position });
            });
        });

        function computeMatches(
            players: { player: Player; position: number }[]
        ): [Player, Player, number][] {
            if (players.length === 0) return [];

            const player1 = players.shift() ?? {
                player: new Player(321, 321, 321, 321),
                position: 1,
            };
            const player1_results = players.map((player2) => {
                return [
                    player1.player,
                    player2.player,
                    player1.position < player2.position ? 1 : 0.5,
                ];
            });

            return player1_results.concat(computeMatches(players)) as [
                Player,
                Player,
                number
            ][];
        }

        return computeMatches(players);
    }
}

/**
 * The class for a player object
 */
export class Player {
    private _tau: number;
    private __rating: number;
    private __rd: number;
    private __vol: number;
    /**
     * An array of the ratings of the opponents faced
     */
    public adv_ranks: number[] = [];
    /**
     * An array of the rating deviations of the opponents faced
     */
    public adv_rds: number[] = [];
    /**
     * An array of the outcomes the player has been in
     */
    public outcomes: number[] = [];
    /**
     * The default rating of the player
     * @default 1500
     */
    public defaultRating = 1500;
    /**
     * The id of the player
     * @default 0
     */
    public id = 0;
    /**
     * The volatility algorithm used by the player
     */
    public volatilityAlgorithm: (v: number, delta: number) => number;
    /**
     * Object of various algorithms that can be used by the ranking system
     */
    public readonly volatilityAlgorithms = {
        oldProcedure: (v: number, delta: number): number => {
            const sigma = this.__vol;
            const phi = this.__rd;
            const tau = this._tau;

            let x1, x2, x3, y2, y3;
            let result;

            const upper = findUpperFalsep(phi, v, delta, tau);

            const a = Math.log(Math.pow(sigma, 2));
            let y1 = equation(phi, v, 0, a, tau, delta);
            if (y1 > 0) {
                result = upper;
            } else {
                x1 = 0;
                x2 = x1;
                y2 = y1;
                x1 = x1 - 1;
                y1 = equation(phi, v, x1, a, tau, delta);
                while (y1 < 0) {
                    x2 = x1;
                    y2 = y1;
                    x1 = x1 - 1;
                    y1 = equation(phi, v, x1, a, tau, delta);
                }
                for (let i = 0; i < 21; i++) {
                    x3 = (y1 * (x1 - x2)) / (y2 - y1) + x1;
                    y3 = equation(phi, v, x3, a, tau, delta);
                    if (y3 > 0) {
                        x1 = x3;
                        y1 = y3;
                    } else {
                        x2 = x3;
                        y2 = y3;
                    }
                }
                if (Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2) > upper) {
                    result = upper;
                } else {
                    result = Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2);
                }
            }
            return result;

            function equation(
                phi: number,
                v: number,
                x: number,
                a: number,
                tau: number,
                delta: number
            ) {
                const d = Math.pow(phi, 2) + v + Math.exp(x);
                return (
                    -(x - a) / Math.pow(tau, 2) -
                    (0.5 * Math.exp(x)) / d +
                    0.5 * Math.exp(x) * Math.pow(delta / d, 2)
                );
            }

            function dequation(
                phi: number,
                v: number,
                x: number,
                tau: number,
                delta: number
            ) {
                const d = Math.pow(phi, 2) + v + Math.exp(x);
                return (
                    -1 / Math.pow(tau, 2) -
                    (0.5 * Math.exp(x)) / d +
                    (0.5 * Math.exp(x) * (Math.exp(x) + Math.pow(delta, 2))) /
                        Math.pow(d, 2) -
                    (Math.pow(Math.exp(x), 2) * Math.pow(delta, 2)) /
                        Math.pow(d, 3)
                );
            }

            function findUpperFalsep(
                phi: number,
                v: number,
                delta: number,
                tau: number
            ) {
                let x1, x2, x3, y1, y2, y3;
                y1 = dequation(phi, v, 0, tau, delta);
                if (y1 < 0) {
                    return 1;
                } else {
                    x1 = 0;
                    x2 = x1;
                    y2 = y1;
                    x1 = x1 - 1;
                    y1 = dequation(phi, v, x1, tau, delta);
                    while (y1 > 0) {
                        x2 = x1;
                        y2 = y1;
                        x1 = x1 - 1;
                        y1 = dequation(phi, v, x1, tau, delta);
                    }
                    for (let i = 0; i < 21; i++) {
                        x3 = (y1 * (x1 - x2)) / (y2 - y1) + x1;
                        y3 = dequation(phi, v, x3, tau, delta);
                        if (y3 > 0) {
                            x1 = x3;
                            y1 = y3;
                        } else {
                            x2 = x3;
                            y2 = y3;
                        }
                    }
                    return Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2);
                }
            }
        },
        newProcedure: (v: number, delta: number): number => {
            //Step 5.1
            let A = Math.log(Math.pow(this.__vol, 2));
            const f = this._makef(delta, v, A);
            const epsilon = 0.0000001;

            //Step 5.2
            let B, k;
            if (Math.pow(delta, 2) > Math.pow(this.__rd, 2) + v) {
                B = Math.log(Math.pow(delta, 2) - Math.pow(this.__rd, 2) - v);
            } else {
                k = 1;
                while (f(A - k * this._tau) < 0) {
                    k = k + 1;
                }
                B = A - k * this._tau;
            }

            //Step 5.3
            let fA = f(A);
            let fB = f(B);

            //Step 5.4
            let C, fC;
            while (Math.abs(B - A) > epsilon) {
                C = A + ((A - B) * fA) / (fB - fA);
                fC = f(C);
                if (fC * fB < 0) {
                    A = B;
                    fA = fB;
                } else {
                    fA = fA / 2;
                }
                B = C;
                fB = fC;
            }
            //Step 5.5
            return Math.exp(A / 2);
        },
        newProcedure_mod: (v: number, delta: number): number => {
            //Step 5.1
            let A = Math.log(Math.pow(this.__vol, 2));
            const f = this._makef(delta, v, A);
            const epsilon = 0.0000001;

            //Step 5.2
            let B, k;
            //XXX mod
            if (delta > Math.pow(this.__rd, 2) + v) {
                //XXX mod
                B = Math.log(delta - Math.pow(this.__rd, 2) - v);
            } else {
                k = 1;
                while (f(A - k * this._tau) < 0) {
                    k = k + 1;
                }
                B = A - k * this._tau;
            }

            //Step 5.3
            let fA = f(A);
            let fB = f(B);

            //Step 5.4
            let C, fC;
            while (Math.abs(B - A) > epsilon) {
                C = A + ((A - B) * fA) / (fB - fA);
                fC = f(C);
                if (fC * fB < 0) {
                    A = B;
                    fA = fB;
                } else {
                    fA = fA / 2;
                }
                B = C;
                fB = fC;
            }
            //Step 5.5
            return Math.exp(A / 2);
        },
        oldProcedure_simple: (v: number, delta: number): number => {
            const a = Math.log(Math.pow(this.__vol, 2));
            const tau = this._tau;
            let x0 = a;
            let x1 = 0;
            let d, h1, h2;

            while (Math.abs(x0 - x1) > 0.00000001) {
                // New iteration, so x(i) becomes x(i-1)
                x0 = x1;
                d = Math.pow(this.__rating, 2) + v + Math.exp(x0);
                h1 =
                    -(x0 - a) / Math.pow(tau, 2) -
                    (0.5 * Math.exp(x0)) / d +
                    0.5 * Math.exp(x0) * Math.pow(delta / d, 2);
                h2 =
                    -1 / Math.pow(tau, 2) -
                    (0.5 * Math.exp(x0) * (Math.pow(this.__rating, 2) + v)) /
                        Math.pow(d, 2) +
                    (0.5 *
                        Math.pow(delta, 2) *
                        Math.exp(x0) *
                        (Math.pow(this.__rating, 2) + v - Math.exp(x0))) /
                        Math.pow(d, 3);
                x1 = x0 - h1 / h2;
            }

            return Math.exp(x1 / 2);
        },
    };
    constructor(rating: number, rd: number, vol: number, tau: number) {
        this._tau = tau;
        this.__rating = (rating - this.defaultRating) / scalingFactor;
        this.__rd = rd / scalingFactor;
        this.__vol = vol;
        this.volatilityAlgorithm = (v: number, delta: number) => v + delta;
    }

    /**
     * @returns The rating of the player in the Glicko format
     */
    public getRating(): number {
        return this.__rating * scalingFactor + this.defaultRating;
    }

    /**
     * Sets the rating of the player
     * @param rating The rating in Glicko format
     */
    public setRating(rating: number): void {
        this.__rating = (rating - this.defaultRating) / scalingFactor;
    }

    /**
     * @returns The rating deviation of the player
     */
    public getRd(): number {
        return this.__rd * scalingFactor;
    }

    /**
     * Sets the rating deviation of the player
     */
    public setRd(rd: number): void {
        this.__rd = rd / scalingFactor;
    }

    /**
     * @returns The volatility value of the player
     */
    public getVol(): number {
        return this.__vol;
    }

    /**
     * Sets the volatility value of the player
     */
    public setVol(vol: number): void {
        this.__vol = vol;
    }

    /**
     * @returns An object of the players rating, rating deviation, volatility and the recent outcomes
     */
    public getRatings(): {
        rating: number;
        rd: number;
        vol: number;
        outcomes: number[];
    } {
        return {
            rating: this.getRating(),
            rd: this.getRd(),
            vol: this.__vol,
            outcomes: this.outcomes,
        };
    }

    /**
     * Adds a result to the players object
     * @param outcome The outcome : 0 = defeat, 1 = victory, 0.5 = draw
     */
    public addResult(opponent: Player, outcome: number): void {
        this.adv_ranks.push(opponent.__rating);
        this.adv_rds.push(opponent.__rd);
        this.outcomes.push(outcome);
    }

    /**
     * Calculates the new rating and rating deviation of the player.
     * Follows the steps of the algorithm described at http://www.glicko.net/glicko/glicko2.pdf
     */
    public update_rank(): void {
        if (!this.hasPlayed()) {
            // Applies only the Step 6 of the algorithm
            this._preRatingRD();
            return;
        }

        //Step 1 : done by Player initialization
        //Step 2 : done by setRating and setRd

        //Step 3
        const v = this._letiance();

        //Step 4
        const delta = this._delta(v);

        //Step 5
        this.__vol = this.volatilityAlgorithm(v, delta);

        //Step 6
        this._preRatingRD();

        //Step 7
        this.__rd = 1 / Math.sqrt(1 / Math.pow(this.__rd, 2) + 1 / v);

        let tempSum = 0;
        for (let i = 0, len = this.adv_ranks.length; i < len; i++) {
            tempSum +=
                this._g(this.adv_rds[i]) *
                (this.outcomes[i] -
                    this._E(this.adv_ranks[i], this.adv_rds[i]));
        }
        this.__rating += Math.pow(this.__rd, 2) * tempSum;

        //Step 8 : done by getRating and getRd
    }

    /**
     * @returns A boolean value of if the player has played a game
     */
    public hasPlayed(): boolean {
        return this.outcomes.length > 0;
    }

    /**
     * Calculates and updates the player's rating deviation for the beginning of a rating period.
     * preRatingRD() -> None
     */
    private _preRatingRD() {
        this.__rd = Math.sqrt(Math.pow(this.__rd, 2) + Math.pow(this.__vol, 2));
    }

    /**
     * Calculation of the estimated letiance of the player's rating based on game outcomes
     */
    private _letiance() {
        let tempSum = 0;
        for (let i = 0, len = this.adv_ranks.length; i < len; i++) {
            const tempE = this._E(this.adv_ranks[i], this.adv_rds[i]);
            tempSum +=
                Math.pow(this._g(this.adv_rds[i]), 2) * tempE * (1 - tempE);
        }
        return 1 / tempSum;
    }

    /**
     * The Glicko E function.
     */
    private _E(p2rating: number, p2RD: number) {
        return (
            1 / (1 + Math.exp(-1 * this._g(p2RD) * (this.__rating - p2rating)))
        );
    }

    /**
     * The Glicko2 g(RD) function.
     */
    private _g(RD: number) {
        return 1 / Math.sqrt(1 + (3 * Math.pow(RD, 2)) / Math.pow(Math.PI, 2));
    }

    /**
     * The delta function of the Glicko2 system.
     * Calculation of the estimated improvement in rating (step 4 of the algorithm)
     */
    private _delta(v: number) {
        let tempSum = 0;
        for (let i = 0, len = this.adv_ranks.length; i < len; i++) {
            tempSum +=
                this._g(this.adv_rds[i]) *
                (this.outcomes[i] -
                    this._E(this.adv_ranks[i], this.adv_rds[i]));
        }
        return v * tempSum;
    }

    /**
     * Makes the f functions for value a and b
     */
    private _makef(delta: number, v: number, a: number) {
        return (x: number): number => {
            return (
                (Math.exp(x) *
                    (Math.pow(delta, 2) -
                        Math.pow(this.__rd, 2) -
                        v -
                        Math.exp(x))) /
                    (2 *
                        Math.pow(Math.pow(this.__rd, 2) + v + Math.exp(x), 2)) -
                (x - a) / Math.pow(this._tau, 2)
            );
        };
    }
}

/**
 * The main class of the rating system
 */
export class Glicko2 {
    private _tau;
    private _default_rating;
    private _default_rd;
    private _default_vol;
    /**
     * An object of all the players cached with their key as their id
     * @default {}
     */
    public players: Record<string, Player> = {};
    /**
     * The number of players in the record
     * @default 0
     */
    public players_index = 0;
    private _volatilityAlgorithm: (v: number, delta: number) => number;
    constructor(
        settings: {
            /**
             * The system constant, tau, which constrains the change in volatility over time,
             * needs to be set prior to application of the system. Reasonable choices are
             * between 0.3 and 1.2, though the system should be tested to decide which value
             * results in greatest predictive accuracy. Smaller values of tau prevent the volatility
             * measures from changing by large amounts, which in turn prevent enormous changes
             * in ratings based on very improbable results. If the application of Glicko-2 is
             * expected to involve extremely improbable collections of game outcomes, then tau
             * should be set to a small value, even as small as, say, tau = 0.2
             * @default 0.5
             */
            tau: number;
            /**
             * Base rating
             * @default 1500
             */
            rating: number;
            /**
             * Base volatility
             * The volatility measure indicates the degree of expected fluctuation in a player’s rating
             * @default 0.06
             */
            vol: number;
            /**
             * Base rating deviation
             * @default 350
             */
            rd: number;
            /**
             * The algorithm to calculate the volatility
             * @default "newProcedure"
             */
            volatilityAlgorithm:
                | "newProcedure"
                | "oldProcedure"
                | "newProcedure_mod"
                | "oldProcedure_simple";
        } = {
            tau: 0.5,
            rating: 1500,
            rd: 350,
            vol: 0.06,
            volatilityAlgorithm: "newProcedure",
        }
    ) {
        this._tau = settings.tau;

        this._default_rating = settings.rating;

        this._default_rd = settings.rd;

        this._default_vol = settings.vol;

        this._volatilityAlgorithm = new Player(1, 1, 1, 1).volatilityAlgorithms[
            settings.volatilityAlgorithm
        ];
    }

    public makeRace(results: [Player][]): Race {
        return new Race(results);
    }

    /**
     * Removes all the players from the cache
     */
    public removePlayers(): void {
        this.players = {};
        this.players_index = 0;
    }

    /**
     * @returns A object with the player index id as the key and the Player object as the member
     */
    public getPlayers(): Record<string, Player> {
        return this.players;
    }

    /**
     * Removes all of the previous matches from each of the players objects
     */
    public cleanPreviousMatches(): void {
        for (let i = 0; i < Object.keys(this.players).length; i++) {
            this.players[i].adv_ranks = [];
            this.players[i].adv_rds = [];
            this.players[i].outcomes = [];
        }
    }

    /**
     * Updates the ratings for all the players
     */
    public calculatePlayersRatings(): void {
        const keys = Object.keys(this.players);
        for (let i = 0; i < keys.length; i++) {
            this.players[keys[i]].update_rank();
        }
    }

    /**
     * Add players and match result to be taken in account for the new rankings calculation
     * players must have ids, they are not created if it has been done already.
     * @param player1 The first player
     * @param player2 The second player
     * @param outcome The outcome for the first player : 0 = defeat, 1 = victory, 0.5 = draw
     */
    public addMatch(
        player1: { rating: number; rd: number; vol: number; id: number },
        player2: { rating: number; rd: number; vol: number; id: number },
        outcome: number
    ): { pl1: Player; pl2: Player } {
        const pl1 = this._createInternalPlayer(
            player1.rating,
            player1.rd,
            player1.vol,
            player1.id
        );
        const pl2 = this._createInternalPlayer(
            player2.rating,
            player2.rd,
            player2.vol,
            player2.id
        );
        this.addResult(pl1, pl2, outcome);
        return { pl1: pl1, pl2: pl2 };
    }

    /**
     * We do not expose directly createInternalPlayer in order to prevent the assignation of a custom player id whose uniqueness could not be guaranteed
     * @returns A Player object of the new player
     */
    public makePlayer(rating?: number, rd?: number, vol?: number): Player {
        return this._createInternalPlayer(rating, rd, vol);
    }

    private _createInternalPlayer(
        rating?: number,
        rd?: number,
        vol?: number,
        id?: number
    ) {
        if (id === undefined) {
            id = this.players_index;
            this.players_index = this.players_index + 1;
        } else {
            //We check if the player has already been created
            const candidate = this.players[id];
            if (candidate !== undefined) {
                return candidate;
            }
        }
        const player = new Player(
            rating || this._default_rating,
            rd || this._default_rd,
            vol || this._default_vol,
            this._tau
        );
        const playerProto = Object.getPrototypeOf(player);

        // Set this specific Player's `defaultRating`. This _has_ to be done
        // here in order to ensure that new `Glicko2` instances do not change
        // the `defaultRating` of `Player` instances created under previous
        // `Glicko2` instances.
        playerProto.defaultRating = this._default_rating;

        // Same reasoning and purpose as the above code regarding
        // `defaultRating`
        playerProto.volatilityAlgorithm = this._volatilityAlgorithm;

        // Since this `Player`'s rating was calculated upon instantiation,
        // before the `defaultRating` was defined above, we much re-calculate
        // the rating manually.
        player.setRating(rating || this._default_rating);

        player.id = id;
        player.adv_ranks = [];
        player.adv_rds = [];
        player.outcomes = [];
        this.players[id] = player;
        return player;
    }

    /**
     * Add a match result to be taken in account for the new rankings calculation
     * @param player1 The first player
     * @param player2 The second player
     * @param outcome The outcome of the first player : 0 = defeat, 1 = victory, 0.5 = draw
     */
    public addResult(player1: Player, player2: Player, outcome: number): void {
        player1.addResult(player2, outcome);
        player2.addResult(player1, 1 - outcome);
    }

    public updateRatings(matches: [Player, Player, number][]): void {
        if (matches instanceof Race) {
            matches = matches.getMatches();
        }
        if (typeof matches !== "undefined") {
            this.cleanPreviousMatches();
            for (let i = 0, len = matches.length; i < len; i++) {
                const match = matches[i];
                this.addResult(match[0], match[1], match[2]);
            }
        }
        this.calculatePlayersRatings();
    }
}
