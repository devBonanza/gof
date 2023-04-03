/**
 *
 * @param {Number} t Time elapsed since start of tween in ms
 * @param {Number} b Beginning value of property
 * @param {Number} c Total change of property over duration of tween
 * @param {Number} d Total duration of tween
 * @returns {Number}
 */
// @ts-ignore
const easeLinear = (t: number, b: number, c: number, d: number) => c * t / d + b;

const easeInQuad = (t: number, b: number, c: number, d: number) => c * (t /= d) * t + b;
const easeOutQuad = (t: number, b: number, c: number, d: number) => -c * (t /= d) * (t - 2) + b;
const easeInOutQuad = (t: number, b: number, c: number, d: number) =>
    (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;

const easeInCubic = (t: number, b: number, c: number, d: number) => c * (t /= d) * t * t + b;
const easeOutCubic = (t: number, b: number, c: number, d: number) => c * ((t = t / d - 1) * t * t + 1) + b;
const easeInOutCubic = (t: number, b: number, c: number, d: number) =>
    (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;

const easeInQuart = (t: number, b: number, c: number, d: number) => c * (t /= d) * t * t * t + b;
const easeOutQuart = (t: number, b: number, c: number, d: number) => -c * ((t = t / d - 1) * t * t * t - 1) + b;
const easeInOutQuart = (t: number, b: number, c: number, d: number) =>
    (t /= d / 2) < 1
        ? c / 2 * t * t * t * t + b
        : -c / 2 * ((t -= 2) * t * t * t - 2) + b;

const easeInQuint = (t: number, b: number, c: number, d: number) => c * (t /= d) * t * t * t * t + b;
const easeOutQuint = (t: number, b: number, c: number, d: number) =>
    c * ((t = t / d - 1) * t * t * t * t + 1) + b;

const easeInOutQuint = (t: number, b: number, c: number, d: number) =>
    (t /= d / 2) < 1
        ? c / 2 * t * t * t * t * t + b
        : c / 2 * ((t -= 2) * t * t * t * t + 2) + b;

const easeInSine = (t: number, b: number, c: number, d: number) => -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
const easeOutSine = (t: number, b: number, c: number, d: number) => c * Math.sin(t / d * (Math.PI / 2)) + b;
const easeInOutSine = (t: number, b: number, c: number, d: number) =>
    -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;

const easeInExpo = (t: number, b: number, c: number, d: number) =>
    t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;

const easeOutExpo = (t: number, b: number, c: number, d: number) =>
    t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;

const easeInOutExpo = (t: number, b: number, c: number, d: number) => {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

const easeInCirc = (t: number, b: number, c: number, d: number) => -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
const easeOutCirc = (t: number, b: number, c: number, d: number) => c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
const easeInOutCirc = (t: number, b: number, c: number, d: number) =>
    (t /= d / 2) < 1
        ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
        : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;

/**
 *
 * @param {Number} t Time elapsed since start of tween in ms
 * @param {Number} b Beginning value of property
 * @param {Number} c Total change of property over duration of tween
 * @param {Number} d Total duration of tween
 * @param {Number} s Overshoot default 1.70158
 * @param {Number} p Period default 0
 * @param {Number} a Amplitude default c
 * @returns {Number}
 */
const easeInElastic = (t: number, b: number, c: number, d: number, s: number, p: number, a: number) => {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;

    s = s === undefined ? 1.70158 : s;
    p = p === undefined ? d * 0.3 : p;
    a = a === undefined ? c : a;

    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return (
        -(
            a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p)
        ) + b
    );
};

const easeOutElastic = (t: number, b: number, c: number, d: number, s: number, p: number, a: number) => {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;

    s = s === undefined ? 1.70158 : s;
    p = p === undefined ? d * 0.3 : p;
    a = a === undefined ? c : a;

    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return (
        a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    );
};

const easeInOutElastic = (t: number, b: number, c: number, d: number, s: number, p: number, a: number) => {
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;

    s = s === undefined ? 1.70158 : s;
    p = p === undefined ? d * (0.3 * 1.5) : p;
    a = a === undefined ? c : a;

    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else  s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) {
        return (
            -0.5 *
            (a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) +
            b
        );
    }
    return (
        a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) *
        0.5 +
        c +
        b
    );
};

const easeInBack = (t: number, b: number, c: number, d: number, s: number) => {
    s = s === undefined ? 1.70158 : s;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

const easeOutBack = (t: number, b: number, c: number, d: number, s: number) => {
     s = s === undefined ? 1.70158 : s;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

const easeInOutBack = (t: number, b: number, c: number, d: number, s: number) => {
     s = s === undefined ? 1.70158 : s;
    if ((t /= d / 2) < 1)
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};

const easeInBounce = (t: number, b: number, c: number, d: number) => c - easeOutBounce(d - t, 0, c, d) + b;
const easeOutBounce = (t: number, b: number, c: number, d: number) => {
    if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
};

const easeInOutBounce = (t: number, b: number, c: number, d: number) => {
    if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

let Easing;
export default Easing = {
    easeLinear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInBack,
    easeOutBack,
    easeInOutBack,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce
};
