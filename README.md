# ![glicko2.ts](https://socialify.git.ci/animafps/glicko2.ts/image?description=1&language=1&owner=1&theme=Dark)

[![Codecov](https://flat.badgen.net/codecov/c/github/animafps/glicko2.ts?icon=codecov)](https://codecov.io/gh/animafps/glicko2.ts)
[![Continuous Integration](https://flat.badgen.net/github/checks/animafps/glicko2.ts/main/build)](https://github.com/animafps/glicko2.ts/actions/workflows/Continuous_Integration.yml)
[![npm](https://flat.badgen.net/npm/v/glicko2.ts?label=npm&icon=npm)](https://www.npmjs.com/package/glicko2.ts)
[![npm](https://flat.badgen.net/npm/dt/glicko2.ts?label=npm%20downloads&icon=npm)](https://www.npmjs.com/package/glicko2.ts)

## About

An Implementation of the Glicko-2 rating system in typescript. The Glicko-2 rating system is a method for assessing a player's strength in games of skill, such as chess and go. The algorithm is explained by its author, Mark E. Glickman, on <http://glicko.net/glicko.html>.

Each player begins with a rating, a rating deviation (accuracy of the rating) and a volatility (speed of rating evolution). These values will evolve according to the outcomes of matches with other players.

This implementation is fully typed and written in Typescript.

It also includes things that where not in the base Glicko-2 system including [races](https://glicko2.js.org/classes/Race.html) and [teams](https://glicko2.js.org/classes/Team.html) for games that have more than two players.

## Installing

### Node(npm/yarn)

```shell
npm i glicko2.ts
```

or

```shell
yarn add glicko2.ts
```

### Deno

To install in a Deno environment you can use the package hosted at

<https://deno.land/x/glicko2/deno_dist/mod.ts>

## Usage

First we initiate a ranking manager and create players with initial ratings, rating deviations and volatilities.

```ts
import { Player, Glicko2 } from 'glicko2.ts'

const ranking = new Glicko2({
    // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
    //        be tested to decide which value results in greatest predictive accuracy"
    tau : 0.5,
    // rating : default rating
    rating : 1500,
    //rd : Default rating deviation 
    //     small number = good confidence on the rating accuracy
    rd : 200,
    //vol : Default volatility (expected fluctuation on the player rating)
    vol : 0.06
})

const Player1 = ranking.makePlayer()
const Player2 = ranking.makePlayer(1400, 30, 0.06)
const Player3 = ranking.makePlayer(1500, 100, 0.06)
```

Afterwards we can create a simple match or matches and calculate the ratings

```ts
const matches = []
matches.push([Player1, Player2, 1]) //Player1 won over Player2
matches.push([Player1, Player3, 0.5]) //A draw between Player1 and Player3
ranking.updateRatings(matches)
```

### When to update rankings

You should not update the ranking after each match.
The typical use of glicko is to calculate the ratings after each tournament (ie collection of matches in a period of time).
A player rating will evolve after a tournament has finished, but not during the tournament.

Here is what says Mark E. Glickman about the number of matches in a tournament or rating period (cf. <http://www.glicko.net/glicko/glicko2.pdf> ) :
> The Glicko-2 system works best when the number of games in a rating period is moderate to large, say an average of at least 10-15 games per player in a rating period.

### Races

Another function that is included in this library is for multiple competitor matches called "Races" where they are competing at the same time.

```ts
const race = raking.makeRace(
    [
        [Player1], //Player1 won the race
        [Player2, Player3], //Player2 and Player3 both tied at 2nd position
    ]
)

ranking.updateRatings(race)
```

## API Documentation

The API documentation is hosted at <https://glicko2.js.org>

## License

This repository is licensed under [GNU General Public License v3.0](https://github.com/animafps/glicko2.ts/blob/main/LICENSE)
