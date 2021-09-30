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

**`example`**
```ts
const race = new Race([[player1], [player2, player3], [player4]])
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [`Player`](Player.md)[][] | An ordered array of the race results with the winner in index 0, for all the players who tied on result they go into the same array |

#### Defined in

[glicko2.ts:18](https://github.com/animafps/glicko2.ts/blob/24ea2b7/glicko2.ts#L18)

## Properties

### matches

• **matches**: [[`Player`](Player.md), [`Player`](Player.md), `number`][] = `[]`

Array of the matches and outcomes based on the race results

#### Defined in

[glicko2.ts:10](https://github.com/animafps/glicko2.ts/blob/24ea2b7/glicko2.ts#L10)

## Methods

### computeMatches

▸ **computeMatches**(`results`): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

Turns an array of race results to an array of matches and outcomes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `results` | [`Player`](Player.md)[][] | An ordered array of the race results with the winner in index 0 |

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

An array of matches and outcomes based on the race results

#### Defined in

[glicko2.ts:34](https://github.com/animafps/glicko2.ts/blob/24ea2b7/glicko2.ts#L34)

___

### getMatches

▸ **getMatches**(): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

An array of the matches within the race in the format [Player, Player, placement][]

#### Defined in

[glicko2.ts:25](https://github.com/animafps/glicko2.ts/blob/24ea2b7/glicko2.ts#L25)
