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

| Name | Type |
| :------ | :------ |
| `rating` | `number` |
| `rd` | `number` |
| `vol` | `number` |
| `tau` | `number` |

#### Defined in

[glicko2.ts:69](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L69)

## Properties

### \_\_rating

• `Private` **\_\_rating**: `number`

#### Defined in

[glicko2.ts:60](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L60)

___

### \_\_rd

• `Private` **\_\_rd**: `number`

#### Defined in

[glicko2.ts:61](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L61)

___

### \_\_vol

• `Private` **\_\_vol**: `number`

#### Defined in

[glicko2.ts:62](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L62)

___

### \_tau

• `Private` **\_tau**: `number`

#### Defined in

[glicko2.ts:59](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L59)

___

### adv\_ranks

• **adv\_ranks**: `number`[] = `[]`

#### Defined in

[glicko2.ts:63](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L63)

___

### adv\_rds

• **adv\_rds**: `number`[] = `[]`

#### Defined in

[glicko2.ts:64](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L64)

___

### defaultRating

• `Private` **defaultRating**: `number` = `1500`

#### Defined in

[glicko2.ts:66](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L66)

___

### id

• **id**: `number` = `0`

#### Defined in

[glicko2.ts:67](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L67)

___

### outcomes

• **outcomes**: `number`[] = `[]`

#### Defined in

[glicko2.ts:65](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L65)

___

### volatilityAlgorithm

• **volatilityAlgorithm**: (`v`: `number`, `delta`: `number`) => `number`

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

[glicko2.ts:68](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L68)

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

[glicko2.ts:190](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L190)

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

[glicko2.ts:207](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L207)

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

[glicko2.ts:199](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L199)

___

### \_letiance

▸ `Private` **_letiance**(): `number`

Calculation of the estimated letiance of the player's rating based on game outcomes

#### Returns

`number`

#### Defined in

[glicko2.ts:177](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L177)

___

### \_makef

▸ **_makef**(`delta`, `v`, `a`): (`x`: `number`) => `number`

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

[glicko2.ts:218](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L218)

___

### \_preRatingRD

▸ `Private` **_preRatingRD**(): `void`

Calculates and updates the player's rating deviation for the beginning of a rating period.
preRatingRD() -> None

#### Returns

`void`

#### Defined in

[glicko2.ts:170](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L170)

___

### addResult

▸ **addResult**(`opponent`, `outcome`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opponent` | [`Player`](Player.md) |
| `outcome` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:115](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L115)

___

### getRating

▸ **getRating**(): `number`

#### Returns

`number`

#### Defined in

[glicko2.ts:77](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L77)

___

### getRatings

▸ **getRatings**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `outcomes` | `number`[] |
| `rating` | `number` |
| `rd` | `number` |
| `vol` | `number` |

#### Defined in

[glicko2.ts:101](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L101)

___

### getRd

▸ **getRd**(): `number`

#### Returns

`number`

#### Defined in

[glicko2.ts:85](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L85)

___

### getVol

▸ **getVol**(): `number`

#### Returns

`number`

#### Defined in

[glicko2.ts:93](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L93)

___

### hasPlayed

▸ **hasPlayed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[glicko2.ts:162](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L162)

___

### setRating

▸ **setRating**(`rating`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rating` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:81](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L81)

___

### setRd

▸ **setRd**(`rd`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rd` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:89](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L89)

___

### setVol

▸ **setVol**(`vol`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vol` | `number` |

#### Returns

`void`

#### Defined in

[glicko2.ts:97](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L97)

___

### update\_rank

▸ **update_rank**(): `void`

Calculates the new rating and rating deviation of the player.
Follows the steps of the algorithm described at http://www.glicko.net/glicko/glicko2.pdf

#### Returns

`void`

#### Defined in

[glicko2.ts:125](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L125)
