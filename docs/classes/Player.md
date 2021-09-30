[glicko2.ts](../README.md) / Player

# Class: Player

The class for a player object

## Table of contents

### Constructors

- [constructor](Player.md#constructor)

### Properties

- [\_\_rating](Player.md#__rating)
- [\_\_rd](Player.md#__rd)
- [\_\_vol](Player.md#__vol)
- [\_tau](Player.md#_tau)
- [adv\_ranks](Player.md#adv_ranks)
- [adv\_rds](Player.md#adv_rds)
- [defaultRating](Player.md#defaultrating)
- [id](Player.md#id)
- [outcomes](Player.md#outcomes)
- [volatilityAlgorithm](Player.md#volatilityalgorithm)
- [volatilityAlgorithms](Player.md#volatilityalgorithms)

### Methods

- [\_E](Player.md#_e)
- [\_delta](Player.md#_delta)
- [\_g](Player.md#_g)
- [\_letiance](Player.md#_letiance)
- [\_makef](Player.md#_makef)
- [\_preRatingRD](Player.md#_preratingrd)
- [addResult](Player.md#addresult)
- [getRating](Player.md#getrating)
- [getRatings](Player.md#getratings)
- [getRd](Player.md#getrd)
- [getVol](Player.md#getvol)
- [hasPlayed](Player.md#hasplayed)
- [setRating](Player.md#setrating)
- [setRd](Player.md#setrd)
- [setVol](Player.md#setvol)
- [update\_rank](Player.md#update_rank)

## Constructors

### constructor

• **new Player**(`rating`, `rd`, `vol`, `tau`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rating` | `number` | The rating of the new player in Glicko format |
| `rd` | `number` |  |
| `vol` | `number` |  |
| `tau` | `number` |  |

#### Defined in

[glicko2.ts:355](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L355)

## Properties

### \_\_rating

• `Private` **\_\_rating**: `number`

Internal rating in the Glicko-2 scale

#### Defined in

[glicko2.ts:84](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L84)

___

### \_\_rd

• `Private` **\_\_rd**: `number`

Internal rating deviation

#### Defined in

[glicko2.ts:88](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L88)

___

### \_\_vol

• `Private` **\_\_vol**: `number`

Internal volatility

#### Defined in

[glicko2.ts:92](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L92)

___

### \_tau

• `Private` **\_tau**: `number`

Internal value for Tau

#### Defined in

[glicko2.ts:80](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L80)

___

### adv\_ranks

• **adv\_ranks**: `number`[] = `[]`

An array of the ratings of the opponents faced

#### Defined in

[glicko2.ts:96](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L96)

___

### adv\_rds

• **adv\_rds**: `number`[] = `[]`

An array of the rating deviations of the opponents faced

#### Defined in

[glicko2.ts:100](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L100)

___

### defaultRating

• **defaultRating**: `number` = `1500`

The default rating of the player

**`default`** 1500

#### Defined in

[glicko2.ts:109](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L109)

___

### id

• **id**: `number` = `0`

The id of the player

**`default`** 0

#### Defined in

[glicko2.ts:114](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L114)

___

### outcomes

• **outcomes**: `number`[] = `[]`

An array of the outcomes the player has been in

#### Defined in

[glicko2.ts:104](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L104)

___

### volatilityAlgorithm

• **volatilityAlgorithm**: (`v`: `number`, `delta`: `number`) => `number`

#### Type declaration

▸ (`v`, `delta`): `number`

The volatility algorithm used by the player

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |
| `delta` | `number` |

##### Returns

`number`

#### Defined in

[glicko2.ts:118](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L118)

___

### volatilityAlgorithms

• `Readonly` **volatilityAlgorithms**: `Object`

Object of various algorithms that can be used by the ranking system

#### Type declaration

| Name | Type |
| :------ | :------ |
| `newProcedure` | (`v`: `number`, `delta`: `number`) => `number` |
| `newProcedure_mod` | (`v`: `number`, `delta`: `number`) => `number` |
| `oldProcedure` | (`v`: `number`, `delta`: `number`) => `number` |
| `oldProcedure_simple` | (`v`: `number`, `delta`: `number`) => `number` |

#### Defined in

[glicko2.ts:122](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L122)

## Methods

### \_E

▸ `Private` **_E**(`p2rating`, `p2RD`): `number`

The Glicko E function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `p2rating` | `number` |
| `p2RD` | `number` |

#### Returns

`number`

#### Defined in

[glicko2.ts:505](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L505)

___

### \_delta

▸ `Private` **_delta**(`v`): `number`

The delta function of the Glicko2 system.
Calculation of the estimated improvement in rating (step 4 of the algorithm)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `number` |

#### Returns

`number`

#### Defined in

[glicko2.ts:522](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L522)

___

### \_g

▸ `Private` **_g**(`RD`): `number`

The Glicko2 g(RD) function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `RD` | `number` |

#### Returns

`number`

#### Defined in

[glicko2.ts:514](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L514)

___

### \_letiance

▸ `Private` **_letiance**(): `number`

Calculation of the estimated letiance of the player's rating based on game outcomes

#### Returns

`number`

#### Defined in

[glicko2.ts:492](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L492)

___

### \_makef

▸ `Private` **_makef**(`delta`, `v`, `a`): (`x`: `number`) => `number`

Makes the f functions for value a and b

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |
| `v` | `number` |
| `a` | `number` |

#### Returns

`fn`

▸ (`x`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

##### Returns

`number`

#### Defined in

[glicko2.ts:536](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L536)

___

### \_preRatingRD

▸ `Private` **_preRatingRD**(): `void`

Calculates and updates the player's rating deviation for the beginning of a rating period.
preRatingRD() -> None

#### Returns

`void`

#### Defined in

[glicko2.ts:485](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L485)

___

### addResult

▸ **addResult**(`opponent`, `outcome`): `void`

Adds a result to the players object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opponent` | [`Player`](Player.md) | - |
| `outcome` | `number` | The outcome: 0 = defeat, 1 = victory, 0.5 = draw |

#### Returns

`void`

#### Defined in

[glicko2.ts:427](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L427)

___

### getRating

▸ **getRating**(): `number`

#### Returns

`number`

The rating of the player in the Glicko format

#### Defined in

[glicko2.ts:366](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L366)

___

### getRatings

▸ **getRatings**(): `Object`

#### Returns

`Object`

An object of the players rating, rating deviation, volatility and the recent outcomes

| Name | Type |
| :------ | :------ |
| `outcomes` | `number`[] |
| `rating` | `number` |
| `rd` | `number` |
| `vol` | `number` |

#### Defined in

[glicko2.ts:409](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L409)

___

### getRd

▸ **getRd**(): `number`

#### Returns

`number`

The rating deviation of the player

#### Defined in

[glicko2.ts:381](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L381)

___

### getVol

▸ **getVol**(): `number`

#### Returns

`number`

The volatility value of the player

#### Defined in

[glicko2.ts:395](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L395)

___

### hasPlayed

▸ **hasPlayed**(): `boolean`

#### Returns

`boolean`

A boolean value of if the player has played a game

#### Defined in

[glicko2.ts:477](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L477)

___

### setRating

▸ **setRating**(`rating`): `void`

Sets the rating of the player

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rating` | `number` | The rating in Glicko format |

#### Returns

`void`

#### Defined in

[glicko2.ts:374](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L374)

___

### setRd

▸ **setRd**(`rd`): `void`

Sets the rating deviation of the player

#### Parameters

| Name | Type |
| :------ | :------ |
| `rd` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:388](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L388)

___

### setVol

▸ **setVol**(`vol`): `void`

Sets the volatility value of the player

#### Parameters

| Name | Type |
| :------ | :------ |
| `vol` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:402](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L402)

___

### update\_rank

▸ **update_rank**(): `void`

Calculates the new rating and rating deviation of the player.
Follows the steps of the algorithm described at http://www.glicko.net/glicko/glicko2.pdf

#### Returns

`void`

#### Defined in

[glicko2.ts:437](https://github.com/animafps/glicko2.ts/blob/b066135/glicko2.ts#L437)
