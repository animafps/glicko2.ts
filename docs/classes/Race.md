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

| Name | Type |
| :------ | :------ |
| `results` | [[`Player`](Player.md)][] |

#### Defined in

[glicko2.ts:13](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L13)

## Properties

### matches

• **matches**: [[`Player`](Player.md), [`Player`](Player.md), `number`][] = `[]`

#### Defined in

[glicko2.ts:12](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L12)

## Methods

### computeMatches

▸ **computeMatches**(`results`): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [[`Player`](Player.md)][] |

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Defined in

[glicko2.ts:21](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L21)

___

### getMatches

▸ **getMatches**(): [[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Returns

[[`Player`](Player.md), [`Player`](Player.md), `number`][]

#### Defined in

[glicko2.ts:17](https://github.com/animafps/glicko2.ts/blob/61d7de1/glicko2.ts#L17)
