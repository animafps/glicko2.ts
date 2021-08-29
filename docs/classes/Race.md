[glicko2.ts](../README.md) / Race

# Class: Race

The class for a Race which is a match that includes more than 2 competitors

## Table of contents

### Constructors

- [constructor](Race.md#constructor)

### Properties

- [matches](Race.md#matches)

### Methods

- [computeMatches](Race.md#computematches)
- [getMatches](Race.md#getmatches)

## Constructors

### constructor

• **new Race**(`results`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [[`Player`](Player.md)][] | An ordered array of the race results with the winner in index 0 |

#### Defined in

[glicko2.ts:14](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L14)

## Properties

### matches

• **matches**: [[`Player`](Player.md), [`Player`](Player.md), `number`][] = `[]`

Array of the matches and outcomes based on the race results

#### Defined in

[glicko2.ts:10](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L10)

## Methods

### computeMatches

▸ **computeMatches**(`results`): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

Turns an array of race results to an array of matches and outcomes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [[`Player`](Player.md)][] | An ordered array of the race results with the winner in index 0 |

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

An array of matches and outcomes based on the race results

#### Defined in

[glicko2.ts:30](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L30)

___

### getMatches

▸ **getMatches**(): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

An array of the matches within the race

#### Defined in

[glicko2.ts:21](https://github.com/animafps/glicko2.ts/blob/4dc3ea7/glicko2.ts#L21)
