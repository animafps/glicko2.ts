# glicko2.ts

[![Codecov](https://img.shields.io/codecov/c/github/animafps/glicko2.ts?style=flat-square&token=rPThDl0sCn)](https://codecov.io/gh/animafps/glicko2.ts)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/animafps/glicko2.ts/Continuous%20Integration?style=flat-square)](https://github.com/animafps/glicko2.ts/actions)

## About

An Implementation of the Glicko-2 rating system in typescript. The Glicko-2 rating system is a method for assessing a player's strength in games of skill, such as chess and go. The algorithm is explained by its author, Mark E. Glickman, on <http://glicko.net/glicko.html>.

Each player begins with a rating, a rating deviation (accuracy of the rating) and a volatility (speed of rating evolution). These values will evolve according to the outcomes of matches with other players.

This implementation is fully typed.

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

<https://deno.land/x/glicko2/glicko2.ts>

## Usage

Usage documentation is still being written and will get it up soon

[API documentation](https://doc.deno.land/https/deno.land/x/glicko2/glicko2.ts)
