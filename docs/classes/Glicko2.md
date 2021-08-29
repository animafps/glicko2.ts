[glicko2.ts](../README.md) / Glicko2

# Class: Glicko2

The main class of the rating system

## Table of contents

### Constructors

- [constructor](Glicko2.md#constructor)

### Properties

- [\_default\_rating](Glicko2.md#_default_rating)
- [\_default\_rd](Glicko2.md#_default_rd)
- [\_default\_vol](Glicko2.md#_default_vol)
- [\_tau](Glicko2.md#_tau)
- [\_volatilityAlgorithm](Glicko2.md#_volatilityalgorithm)
- [players](Glicko2.md#players)
- [players\_index](Glicko2.md#players_index)

### Methods

- [\_createInternalPlayer](Glicko2.md#_createinternalplayer)
- [addMatch](Glicko2.md#addmatch)
- [addResult](Glicko2.md#addresult)
- [calculatePlayersRatings](Glicko2.md#calculateplayersratings)
- [cleanPreviousMatches](Glicko2.md#cleanpreviousmatches)
- [getPlayers](Glicko2.md#getplayers)
- [makePlayer](Glicko2.md#makeplayer)
- [makeRace](Glicko2.md#makerace)
- [removePlayers](Glicko2.md#removeplayers)
- [updateRatings](Glicko2.md#updateratings)

## Constructors

### constructor

• **new Glicko2**(`settings?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settings` | `Object` | - |
| `settings.rating` | `number` | Base rating  **`default`** 1500 |
| `settings.rd` | `number` | Base rating deviation  **`default`** 350 |
| `settings.tau` | `number` | The system constant, tau, which constrains the change in volatility over time, needs to be set prior to application of the system. Reasonable choices are between 0.3 and 1.2, though the system should be tested to decide which value results in greatest predictive accuracy. Smaller values of tau prevent the volatility measures from changing by large amounts, which in turn prevent enormous changes in ratings based on very improbable results. If the application of Glicko-2 is expected to involve extremely improbable collections of game outcomes, then tau should be set to a small value, even as small as, say, tau = 0.2  **`default`** 0.5 |
| `settings.vol` | `number` | Base volatility The volatility measure indicates the degree of expected fluctuation in a player’s rating  **`default`** 0.06 |
| `settings.volatilityAlgorithm` | ``"newProcedure"`` \| ``"oldProcedure"`` \| ``"newProcedure_mod"`` \| ``"oldProcedure_simple"`` | The algorithm to calculate the volatility  **`default`** "newProcedure" |

#### Defined in

[glicko2.ts:539](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L539)

## Properties

### \_default\_rating

• `Private` **\_default\_rating**: `number`

#### Defined in

[glicko2.ts:530](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L530)

___

### \_default\_rd

• `Private` **\_default\_rd**: `number`

#### Defined in

[glicko2.ts:531](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L531)

___

### \_default\_vol

• `Private` **\_default\_vol**: `number`

#### Defined in

[glicko2.ts:532](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L532)

___

### \_tau

• `Private` **\_tau**: `number`

#### Defined in

[glicko2.ts:529](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L529)

___

### \_volatilityAlgorithm

• `Private` **\_volatilityAlgorithm**: (`v`: `number`, `delta`: `number`) => `number`

#### Type declaration

▸ (`v`, `delta`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |
| `delta` | `number` |

##### Returns

`number`

#### Defined in

[glicko2.ts:538](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L538)

___

### players

• **players**: `Record`<`string`, [`Player`](Player.md)\> = `{}`

#### Defined in

[glicko2.ts:533](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L533)

___

### players\_index

• **players\_index**: `number` = `0`

The number of players in the record

#### Defined in

[glicko2.ts:537](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L537)

## Methods

### \_createInternalPlayer

▸ `Private` **_createInternalPlayer**(`rating?`, `rd?`, `vol?`, `id?`): [`Player`](Player.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rating?` | `number` |
| `rd?` | `number` |
| `vol?` | `number` |
| `id?` | `number` |

#### Returns

[`Player`](Player.md)

#### Defined in

[glicko2.ts:675](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L675)

___

### addMatch

▸ **addMatch**(`player1`, `player2`, `outcome`): `Object`

Add players and match result to be taken in account for the new rankings calculation
players must have ids, they are not created if it has been done already.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `player1` | `Object` | The first player |
| `player1.id` | `number` | - |
| `player1.rating` | `number` | - |
| `player1.rd` | `number` | - |
| `player1.vol` | `number` | - |
| `player2` | `Object` | The second player |
| `player2.id` | `number` | - |
| `player2.rating` | `number` | - |
| `player2.rd` | `number` | - |
| `player2.vol` | `number` | - |
| `outcome` | `number` | The outcome for the first player : 0 = defeat, 1 = victory, 0.5 = draw |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `pl1` | [`Player`](Player.md) |
| `pl2` | [`Player`](Player.md) |

#### Defined in

[glicko2.ts:646](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L646)

___

### addResult

▸ **addResult**(`player1`, `player2`, `outcome`): `void`

Add a match result to be taken in account for the new rankings calculation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `player1` | [`Player`](Player.md) | The first player |
| `player2` | [`Player`](Player.md) | The second player |
| `outcome` | `number` | The outcome of the first player : 0 = defeat, 1 = victory, 0.5 = draw |

#### Returns

`void`

#### Defined in

[glicko2.ts:728](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L728)

___

### calculatePlayersRatings

▸ **calculatePlayersRatings**(): `void`

Updates the ratings for all the players

#### Returns

`void`

#### Defined in

[glicko2.ts:632](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L632)

___

### cleanPreviousMatches

▸ **cleanPreviousMatches**(): `void`

Removes all of the previous matches from each of the players objects

#### Returns

`void`

#### Defined in

[glicko2.ts:621](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L621)

___

### getPlayers

▸ **getPlayers**(): `Record`<`string`, [`Player`](Player.md)\>

#### Returns

`Record`<`string`, [`Player`](Player.md)\>

A object with the player index id as the key and the Player object as the member

#### Defined in

[glicko2.ts:614](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L614)

___

### makePlayer

▸ **makePlayer**(`rating?`, `rd?`, `vol?`): [`Player`](Player.md)

We do not expose directly createInternalPlayer in order to prevent the assignation of a custom player id whose uniqueness could not be guaranteed

#### Parameters

| Name | Type |
| :------ | :------ |
| `rating?` | `number` |
| `rd?` | `number` |
| `vol?` | `number` |

#### Returns

[`Player`](Player.md)

A Player object of the new player

#### Defined in

[glicko2.ts:671](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L671)

___

### makeRace

▸ **makeRace**(`results`): [`Race`](Race.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [[`Player`](Player.md)][] |

#### Returns

[`Race`](Race.md)

#### Defined in

[glicko2.ts:599](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L599)

___

### removePlayers

▸ **removePlayers**(): `void`

Removes all the players from the cache

#### Returns

`void`

#### Defined in

[glicko2.ts:606](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L606)

___

### updateRatings

▸ **updateRatings**(`matches`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matches` | [[`Player`](Player.md), [`Player`](Player.md), `number`][] |

#### Returns

`void`

#### Defined in

[glicko2.ts:733](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L733)
