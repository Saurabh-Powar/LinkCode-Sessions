//Rest Operator
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc - curr, 2);
}
console.log(sum(1, 2, 3, 4, 6));

//Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(`Spread FN: ${[...arr1, ...arr2]}`);

//Using Spread Operator with Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const mergedObj = { obj1, obj2 };
const mergedObj2 = { ...obj1, ...obj2 };
console.log(mergedObj);
console.log(mergedObj2);

