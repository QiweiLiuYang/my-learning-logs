// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return num + 2
}

// To check if you've completed it, uncomment these console.logs!
// console.log(addTwo(3));
// console.log(addTwo(10));


// Challenge 2
function addS(word) {
	return word + "s"
}

// uncomment these to check your work
// console.log(addS('pizza'));
// console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
  const newArray = []
	for(let i = 0; i < array.length; i++){
    newArray[i] = callback(array[i])
  }
  return newArray
}

// console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
  for(let i = 0; i < array.length; i++){
    callback(array[i])
  }
}

// see for yourself if your forEach works!
// console.log(forEach(["a", "b", "c", "d"], addS))

// Challenge 5
function mapWith(array, callback) {
  const newArray = []
	forEach(array, (e) => newArray.push(callback(e)))
	return newArray
}

// console.log(mapWith([1, 2, 3], addS))

// Challenge 6
function reduce(array, callback, initialValue) {
	let accumulator = initialValue
  for(let element of array){
    accumulator = callback(accumulator, element)
  }
  return accumulator
}

const nums = [4, 1, 3]
const add = (a, b) =>  a + b
// console.log(reduce(nums, add, 0))


// Challenge 7
function intersection(arrays) {
  if(arrays.length === 0) return []
  
  const initialValue = arrays[0]

  return reduce(arrays, (a, b) => a.filter(e => b.includes(e)), initialValue)
}

// console.log(intersection([[5, 10, 15, 20, 9], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// should log: [5, 15]


// Challenge 8
function union(arrays) {
	if(arrays.length === 0) return []
  
  const initialValue = arrays[0]
  
  return reduce(arrays, (a, b) => {
    forEach(b, (e) => {
      if(!a.includes(e)) a.push(e) 
    })
    return a
  }, initialValue)
}

// console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
// should log: [5, 10, 15, 88, 1, 7, 100]


// Challenge 9
function objOfMatches(array1, array2, callback) {
	const object = {}
  if(array1.length !== array2.length) return object

  for(let i = 0; i < array1.length; i++){
    if(array2[i] === callback(array1[i])){
      object[array1[i]] = array2[i]
    }
  }
  return object
}

// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }


// Challenge 10
function multiMap(arrVals, arrCallbacks) {
	const obj = {}

  for(let value of arrVals){
    const result = []
    for(let callback of arrCallbacks){
      result.push(callback(value))
    }
    obj[value] = [...result]
  }
  
  return obj
}

// console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


// Challenge 11
function objectFilter(obj, callback) {
	const newObj = {}
	
  for(let [k, v] of Object.entries(obj)){
    if(v === callback(k)) newObj[k] = v
  }
  return newObj
}

const cities = {
 London: 'LONDON',
 LA: 'Los Angeles',
 Paris: 'PARIS',
};
// console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}


// Challenge 12
function majority(array, callback) {
	let trues = 0
  let falses = 0
  const mitad = array.length/2
  
	for(let e of array){
    if(callback(e)){trues++}
    else{falses++}
    
    if(trues > mitad){return true}
    if(falses >= mitad){return false}
  }
  return trues > falses
}

// /*** Uncomment these to check your work! ***/
// const isOdd2 = function(num) { return num % 2 === 1; };
// console.log(majority([1, 2, 3, 4, 5], isOdd2)); // should log: true
// console.log(majority([2, 3, 4, 5], isOdd2)); // should log: false


// Challenge 13
function prioritize(array, callback) {
  //const firstTrue = []
  //const lastFalse = []
  
  //for(let e of array){
  //  if(callback(e)){firstTrue.push(e)}
  //  else{lastFalse.push(e)}
  //}
  
  //return [...firstTrue, ...lastFalse]
  
  //const newArray = []
  //const temp = []
  //reduce(array, (a, b) => {
  //  if(callback(b)){a.push(b)}
  //  else{temp.push(b)}
  //  return a
  //}, newArray)
  
  //return [...newArray, ...temp]

	const result = reduce(array, (acc, e) => {
    if(callback(e)){acc.trues.push(e)}
    else{acc.falses.push(e)}
    return acc
  }, {trues: [], falses: []})
  
  return [...result.trues, ...result.falses]
}

// /*** Uncomment these to check your work! ***/
 const startsWithS = function(str) { return str[0] === 's' || str[0] === 'S'; };
 console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)); // should log:
//['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']


// Challenge 14
function countBy(array, callback) {
	const obj = {}
  
  for(let e of array){
    const key = callback(e)
    
    if(obj[key] == undefined){obj[key] = 0}
    
    obj[key]++
  }
  
  return obj
}

// /*** Uncomment these to check your work! ***/
console.log(countBy([1, 2, 3, 4, 5], function(num) {
	if (num % 2 === 0) return 'even';
 else return 'odd';
})); // should log: { odd: 3, even: 2 }


// Challenge 15
function groupBy(array, callback) {

}

// /*** Uncomment these to check your work! ***/
// const decimals = [1.3, 2.1, 2.4];
// const floored = function(num) { return Math.floor(num); };
// console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }


// Challenge 16
function goodKeys(obj, callback) {

}

// /*** Uncomment these to check your work! ***/
// const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
// const startsWithBird = function(str) { return str.slice(0, 4).toLowerCase() === 'bird'; };
// console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']


// Challenge 17
function commutative(func1, func2, value) {

}

// /*** Uncomment these to check your work! ***/
// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false


// Challenge 18
function objFilter(obj, callback) {

}

// /*** Uncomment these to check your work! ***/
// const startingObj = {};
// startingObj[6] = 3;
// startingObj[2] = 1;
// startingObj[12] = 4;
// const half = n => n / 2;
// console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }


// Challenge 19
function rating(arrOfFuncs, value) {

}

// /*** Uncomment these to check your work! ***/
// const isEven = n => n % 2 === 0;
// const greaterThanFour = n => n > 4;
// const isSquare = n => Math.sqrt(n) % 1 === 0;
// const hasSix = n => n.toString().includes('6');
// const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); // should log: 100
// console.log(rating(checks, 66)); // should log: 75


// Challenge 20
function pipe(arrOfFuncs, value) {

}

// /*** Uncomment these to check your work! ***/
// const capitalize = str => str.toUpperCase();
// const addLowerCase = str => str + str.toLowerCase();
// const repeat = str => str + str;
// const capAddlowRepeat = [capitalize, addLowerCase, repeat];
// console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'


// Challenge 21
function highestFunc(objOfFuncs, subject) {

}

// /*** Uncomment these to check your work! ***/
// const groupOfFuncs = {};
// groupOfFuncs.double = n => n * 2;
// groupOfFuncs.addTen = n => n + 10;
// groupOfFuncs.inverse = n => n * -1;
// console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
// console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
// console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'


// Challenge 22
function combineOperations(startVal, arrOfFuncs) {

}

function add100(num) {
  return num + 100;
}

function divByFive(num) {
  return num / 5;
}

function multiplyByThree(num) {
  return num * 3;
}

// /*** Uncomment these to check your work! ***/
// console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
// console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); // Should output 10


// Challenge 23
function myFunc(array, callback) {

}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOdd(num) {
  return (num % 2 !== 0);
}

// /*** Uncomment these to check your work! ***/
// console.log(myFunc(numbers, isOdd)); // Output should be 1
// console.log(myFunc(evens, isOdd)); // Output should be -1


// Challenge 24
function myForEach(array, callback) {

}

let sum = 0;

function addToSum(num) {
  sum += num;
}

// /*** Uncomment these to check your work! ***/
// const nums = [1, 2, 3];
// myForEach(nums, addToSum);
// console.log(sum); // Should output 6
