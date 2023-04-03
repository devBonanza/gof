class MathAdv {
    constuctor() {
    }

    /**
     * A Linear Interpolation Method, mostly used by Phaser.Tween.
     *
     * @param {Array} v - The input array of values to interpolate between.
     * @param {number} k - The percentage of interpolation, between 0 and 1.
     * @return {number} The interpolated value
     */
    linearInterpolation(v: Array<number>, k: number) {
        let m = v.length - 1;
        let f = m * k;
        let i = Math.floor(f);

        if (k < 0) {
            return this.linear(v[0], v[1], f);
        }

        if (k > 1) {
            return this.linear(v[m], v[m - 1], m - f);
        }

        return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
    }

    /**
     * A Bezier Interpolation Method, mostly used by Phaser.Tween.
     *
     * @param {Array} v - The input array of values to interpolate between.
     * @param {number} k - The percentage of interpolation, between 0 and 1.
     * @return {number} The interpolated value
     */
    bezierInterpolation(v: Array<number>, k: number) {
        let b = 0;
        let n = v.length - 1;

        for (let i = 0; i <= n; i++) {
            b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i);
        }

        return b;
    }

    /**
     * @method Phaser.Math#bernstein
     * @protected
     * @param {number} n
     * @param {number} i
     * @return {number}
     */
    bernstein(n: number, i: number) {
        return this.factorial(n) / this.factorial(i) / this.factorial(n - i);
    }

    /**
     * @method Phaser.Math#factorial
     * @param {number} value - the number you want to evaluate
     * @return {number}
     */
    factorial(value: number) {
        if (value === 0) {
            return 1;
        }

        let res = value;

        while (--value) {
            res *= value;
        }

        return res;
    }

    /**
     * A Catmull Rom Interpolation Method, mostly used by Phaser.Tween.
     *
     * @param {Array} v - The input array of values to interpolate between.
     * @param {number} k - The percentage of interpolation, between 0 and 1.
     * @return {number} The interpolated value
     */
    catmullRomInterpolation(v: Array<number>, k: number) {
        let m = v.length - 1;
        let f = m * k;
        let i = Math.floor(f);

        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }

            return this.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {
            if (k < 0) {
                return v[0] - (this.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);
            }

            if (k > 1) {
                return v[m] - (this.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }

            return this.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    }

    /**
     * Calculates a linear (interpolation) value over t.
     *
     * @param {number} p0
     * @param {number} p1
     * @param {number} t - A value between 0 and 1.
     * @return {number}
     */
    linear(p0: number, p1: number, t: number) {
        return (p1 - p0) * t + p0;
    }

    /**
     * Calculates a catmum rom value.
     *
     * @param {number} p0
     * @param {number} p1
     * @param {number} p2
     * @param {number} p3
     * @param {number} t
     * @return {number}
     */
    catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
        let v0 = (p2 - p0) * 0.5,
            v1 = (p3 - p1) * 0.5,
            t2 = t * t,
            t3 = t * t2;

        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }

    /**
     * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
     *
     * @param {Point} point1 - The first point.
     * @param {Point} point2 - The second point.
     * @return {number} The angle between the two points, in radians.
     */
    angleBetweenPoints(point1: any, point2: any) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x);
    }

    lengthBetweenPoints(point1: any, point2: any) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    /**
     *
     *
     * Cubic bezier functions below
     *
     *
     */

    A(aA1: any, aA2: any) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }

    B(aA1: any, aA2: any) {
        return 3.0 * aA2 - 6.0 * aA1;
    }

    C(aA1: any) {
        return 3.0 * aA1;
    }

    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    calcBezier(aT: any, aA1: any, aA2: any) {
        return ((this.A(aA1, aA2) * aT + this.B(aA1, aA2)) * aT + this.C(aA1)) * aT;
    }

    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    getSlope(aT: any, aA1: any, aA2: any) {
        return 3.0 * this.A(aA1, aA2) * aT * aT + 2.0 * this.B(aA1, aA2) * aT + this.C(aA1);
    }

    binarySubdivide(aX: any, aA: any, aB: any, mX1: any, mX2: any) {
        let currentX,
            currentT,
            i = 0;
        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = this.calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            } else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
        return currentT;
    }

    newtonRaphsonIterate(aX: any, aGuessT: any, mX1: any, mX2: any) {
        for (let i = 0; i < 4; ++i) {
            let currentSlope = this.getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0) {
                return aGuessT;
            }
            let currentX = this.calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }

    linearEasing(x: any) {
        return x;
    }

    bezierEasing(mX1: any, mY1: any, mX2: any, mY2: any) {
        let mathAdv = this;

        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
            console.error("bezier x values must be in [0, 1] range");
            return;
        }

        if (mX1 === mY1 && mX2 === mY2) {
            return;//linearEasing;
        }

        // Precompute samples table
        let sampleValues: any = [];
        for (let i = 0; i < 11; ++i) {
            sampleValues[i] = this.calcBezier(i * 0.1, mX1, mX2);
        }

        let getTForX = function (aX: any) {
            let intervalStart = 0.0;
            let currentSample = 1;
            let lastSample = 11 - 1;

            for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += 0.1;
            }
            --currentSample;

            // Interpolate to provide an initial guess for t
            let dist =
                (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            let guessForT = intervalStart + dist * 0.1;

            let initialSlope = mathAdv.getSlope(guessForT, mX1, mX2);
            if (initialSlope >= 0.001) {
                return mathAdv.newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            } else if (initialSlope === 0.0) {
                return guessForT;
            } else {
                return mathAdv.binarySubdivide(aX, intervalStart, intervalStart + 0.1, mX1, mX2);
            }
        };

        return function (x: any) {
            // Because JavaScript number are imprecise, we should guarantee the extremes are right.
            if (x === 0) {
                return 0;
            }
            if (x === 1) {
                return 1;
            }
            return mathAdv.calcBezier(getTForX(x), mY1, mY2);
        };
    }
}

export default new MathAdv();