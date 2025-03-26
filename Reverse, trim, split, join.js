// using split function
const numArray = [1, 2, 3, 4, 5];
console.log('numArray: ' + numArray);
const numString = numArray.join('x'); // Convert to string: "1,2,3"
const splitArray = numString.split('x'); // Split back into array: [1, 2, 3]
const arrayReverse = numArray.reverse(); 
console.log('splitArray : ' + splitArray);
console.log('numString : ' + numString);
console.log('ArrayReverse: ' + arrayReverse);

//using reverse and join functions 
const str = ['Full', 'stack', 'developer', 'with', 'genAI']
const result1 = str.reverse().join(' ');
const result2 = str.reverse().join(' ').split(' ');
console.log(result1);
console.log(result2);