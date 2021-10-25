/**
 * Makes function 'f'
 * used in {@link volatilityAlgorithms}
 * @internal
 */
export function makef(
	delta: number,
	v: number,
	a: number,
	rd: number,
	tau: number
) {
	return (x: number): number => {
		return (
			(Math.exp(x) *
				(Math.pow(delta, 2) - Math.pow(rd, 2) - v - Math.exp(x))) /
				(2 * Math.pow(Math.pow(rd, 2) + v + Math.exp(x), 2)) -
			(x - a) / Math.pow(tau, 2)
		)
	}
}

/**
 * @internal
 */
export interface volatilityArgs {
	vol: number
	tau: number
	rd: number
	rating: number
}

/**
 * @category Volatility
 */
export function oldProcedure(
	v: number,
	delta: number,
	{ vol, rd, tau }: volatilityArgs
): number {
	const sigma = vol
	const phi = rd

	let x1, x2, x3, y2, y3
	let result

	const upper = findUpperFalsep(phi, v, delta, tau)

	const a = Math.log(Math.pow(sigma, 2))
	let y1 = equation(phi, v, 0, a, tau, delta)
	if (y1 > 0) {
		result = upper
	} else {
		x1 = 0
		x2 = x1
		y2 = y1
		x1 = x1 - 1
		y1 = equation(phi, v, x1, a, tau, delta)
		while (y1 < 0) {
			x2 = x1
			y2 = y1
			x1 = x1 - 1
			y1 = equation(phi, v, x1, a, tau, delta)
		}
		for (let i = 0; i < 21; i++) {
			x3 = (y1 * (x1 - x2)) / (y2 - y1) + x1
			y3 = equation(phi, v, x3, a, tau, delta)
			if (y3 > 0) {
				x1 = x3
				y1 = y3
			} else {
				x2 = x3
				y2 = y3
			}
		}
		if (Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2) > upper) {
			result = upper
		} else {
			result = Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2)
		}
	}
	return result

	function equation(
		phi: number,
		v: number,
		x: number,
		a: number,
		tau: number,
		delta: number
	) {
		const d = Math.pow(phi, 2) + v + Math.exp(x)
		return (
			-(x - a) / Math.pow(tau, 2) -
			(0.5 * Math.exp(x)) / d +
			0.5 * Math.exp(x) * Math.pow(delta / d, 2)
		)
	}

	function dequation(
		phi: number,
		v: number,
		x: number,
		tau: number,
		delta: number
	) {
		const d = Math.pow(phi, 2) + v + Math.exp(x)
		return (
			-1 / Math.pow(tau, 2) -
			(0.5 * Math.exp(x)) / d +
			(0.5 * Math.exp(x) * (Math.exp(x) + Math.pow(delta, 2))) /
				Math.pow(d, 2) -
			(Math.pow(Math.exp(x), 2) * Math.pow(delta, 2)) / Math.pow(d, 3)
		)
	}

	function findUpperFalsep(
		phi: number,
		v: number,
		delta: number,
		tau: number
	) {
		let x1, x2, x3, y1, y2, y3
		y1 = dequation(phi, v, 0, tau, delta)
		if (y1 < 0) {
			return 1
		} else {
			x1 = 0
			x2 = x1
			y2 = y1
			x1 = x1 - 1
			y1 = dequation(phi, v, x1, tau, delta)
			while (y1 > 0) {
				x2 = x1
				y2 = y1
				x1 = x1 - 1
				y1 = dequation(phi, v, x1, tau, delta)
			}
			for (let i = 0; i < 21; i++) {
				x3 = (y1 * (x1 - x2)) / (y2 - y1) + x1
				y3 = dequation(phi, v, x3, tau, delta)
				if (y3 > 0) {
					x1 = x3
					y1 = y3
				} else {
					x2 = x3
					y2 = y3
				}
			}
			return Math.exp(((y1 * (x1 - x2)) / (y2 - y1) + x1) / 2)
		}
	}
}

/**
 * The default volatility algorithm for {@link Glicko2}
 * @category Volatility
 */
export function newProcedure(
	v: number,
	delta: number,
	{ vol, tau, rd }: volatilityArgs
): number {
	//Step 5.1
	let A = Math.log(Math.pow(vol, 2))
	const f = makef(delta, v, A, rd, tau)
	const epsilon = 0.0000001

	//Step 5.2
	let B, k
	if (Math.pow(delta, 2) > Math.pow(rd, 2) + v) {
		B = Math.log(Math.pow(delta, 2) - Math.pow(rd, 2) - v)
	} else {
		k = 1
		while (f(A - k * tau) < 0) {
			k = k + 1
		}
		B = A - k * tau
	}

	//Step 5.3
	let fA = f(A)
	let fB = f(B)

	//Step 5.4
	let C, fC
	while (Math.abs(B - A) > epsilon) {
		C = A + ((A - B) * fA) / (fB - fA)
		fC = f(C)
		if (fC * fB < 0) {
			A = B
			fA = fB
		} else {
			fA = fA / 2
		}
		B = C
		fB = fC
	}
	//Step 5.5
	return Math.exp(A / 2)
}

/**
 * @category Volatility
 */
export function newProcedure_mod(
	v: number,
	delta: number,
	{ vol, tau, rd }: volatilityArgs
): number {
	//Step 5.1
	let A = Math.log(Math.pow(vol, 2))
	const f = makef(delta, v, A, rd, tau)
	const epsilon = 0.0000001

	//Step 5.2
	let B, k
	//XXX mod
	if (delta > Math.pow(rd, 2) + v) {
		//XXX mod
		B = Math.log(delta - Math.pow(rd, 2) - v)
	} else {
		k = 1
		while (f(A - k * tau) < 0) {
			k = k + 1
		}
		B = A - k * tau
	}

	//Step 5.3
	let fA = f(A)
	let fB = f(B)

	//Step 5.4
	let C, fC
	while (Math.abs(B - A) > epsilon) {
		C = A + ((A - B) * fA) / (fB - fA)
		fC = f(C)
		if (fC * fB < 0) {
			A = B
			fA = fB
		} else {
			fA = fA / 2
		}
		B = C
		fB = fC
	}
	//Step 5.5
	return Math.exp(A / 2)
}

/**
 * @category Volatility
 */
export function oldProcedure_simple(
	v: number,
	delta: number,
	{ vol, tau, rating }: volatilityArgs
): number {
	const a = Math.log(Math.pow(vol, 2))
	let x0 = a
	let x1 = 0
	let d, h1, h2

	while (Math.abs(x0 - x1) > 0.00000001) {
		// New iteration, so x(i) becomes x(i-1)
		x0 = x1
		d = Math.pow(rating, 2) + v + Math.exp(x0)
		h1 =
			-(x0 - a) / Math.pow(tau, 2) -
			(0.5 * Math.exp(x0)) / d +
			0.5 * Math.exp(x0) * Math.pow(delta / d, 2)
		h2 =
			-1 / Math.pow(tau, 2) -
			(0.5 * Math.exp(x0) * (Math.pow(rating, 2) + v)) / Math.pow(d, 2) +
			(0.5 *
				Math.pow(delta, 2) *
				Math.exp(x0) *
				(Math.pow(rating, 2) + v - Math.exp(x0))) /
				Math.pow(d, 3)
		x1 = x0 - h1 / h2
	}

	return Math.exp(x1 / 2)
}
