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
- [player\_index](Glicko2.md#player_index)
- [players](Glicko2.md#players)
- [players\_index](Glicko2.md#players_index)
- [volatilityAlgorithms](Glicko2.md#volatilityalgorithms)

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
| `settings` | `Object` |  |
| `settings.rating?` | `number` | default rating |
| `settings.rd?` | `number` | - |
| `settings.tau?` | `number` | Internal glicko2 parameter. |
| `settings.vol?` | `number` | - |
| `settings.volatilityAlgorithm?` | `string` | - |

#### Defined in

[glicko2.ts:546](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L546)

## Properties

### \_default\_rating

• `Private` **\_default\_rating**: `number`

#### Defined in

[glicko2.ts:239](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L239)

___

### \_default\_rd

• `Private` **\_default\_rd**: `number`

#### Defined in

[glicko2.ts:240](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L240)

___

### \_default\_vol

• `Private` **\_default\_vol**: `number`

#### Defined in

[glicko2.ts:241](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L241)

___

### \_tau

• `Private` **\_tau**: `number`

#### Defined in

[glicko2.ts:238](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L238)

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

[glicko2.ts:244](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L244)

___

### player\_index

• **player\_index**: `number` = `0`

#### Defined in

[glicko2.ts:245](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L245)

___

### players

• **players**: `Record`<`string`, [`Player`](Player.md)\> = `{}`

#### Defined in

[glicko2.ts:242](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L242)

___

### players\_index

• **players\_index**: `number` = `0`

#### Defined in

[glicko2.ts:243](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L243)

___

### volatilityAlgorithms

• **volatilityAlgorithms**: `any`

Object of various algorithms that can be used by the ranking system

#### Defined in

[glicko2.ts:250](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L250)

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

[glicko2.ts:645](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L645)

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
| `outcome` | `number` | The outcome : 0 = defeat, 1 = victory, 0.5 = draw |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `pl1` | [`Player`](Player.md) |
| `pl2` | [`Player`](Player.md) |

#### Defined in

[glicko2.ts:616](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L616)

___

### addResult

▸ **addResult**(`player1`, `player2`, `outcome`): `void`

Add a match result to be taken in account for the new rankings calculation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `player1` | [`Player`](Player.md) | The first player |
| `player2` | [`Player`](Player.md) | The second player |
| `outcome` | `number` | The outcome : 0 = defeat, 1 = victory, 0.5 = draw |

#### Returns

`void`

#### Defined in

[glicko2.ts:698](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L698)

___

### calculatePlayersRatings

▸ **calculatePlayersRatings**(): `void`

#### Returns

`void`

#### Defined in

[glicko2.ts:602](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L602)

___

### cleanPreviousMatches

▸ **cleanPreviousMatches**(): `void`

#### Returns

`void`

#### Defined in

[glicko2.ts:594](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L594)

___

### getPlayers

▸ **getPlayers**(): `Record`<`string`, [`Player`](Player.md)\>

#### Returns

`Record`<`string`, [`Player`](Player.md)\>

A object with the player index id as the key and the Player object as the member

#### Defined in

[glicko2.ts:590](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L590)

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

[glicko2.ts:641](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L641)

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

[glicko2.ts:575](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L575)

___

### removePlayers

▸ **removePlayers**(): `void`

Removes all the players from the cache

#### Returns

`void`

#### Defined in

[glicko2.ts:582](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L582)

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

[glicko2.ts:703](https://github.com/animafps/glicko2.ts/blob/b8b47fa/glicko2.ts#L703)
