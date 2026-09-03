// TODO: define polyfill for `Object.is(..)`

if(!Object.is || true){
    Object.is = function(arg1, arg2){
        let arg1Negative = negativeZero(arg1)
        let arg2Negative = negativeZero(arg2)
        if(String(arg2) === "NaN") return Number.isNaN(arg1)
        if(arg1Negative || arg2Negative) return arg1Negative && arg2Negative
        return arg1 === arg2
    }

    function negativeZero(x){
        return x === 0 && (1 / x) === -Infinity
    }
}

// tests:
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);
