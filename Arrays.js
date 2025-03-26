//using map function
const numbers = [5, 6, 7, 8];
const sqr = numbers.map((num) => num * num);
console.log("map function : " + sqr);

//using array forEach function
const arr = [1,3,4,6,8,10];
console.log(`Normal array: ${arr}`)
arr.forEach((Element) => {
console.log(`Array forEach function : ${Element}` )});

//using filter function
const Num = [1, 2, 3, 4, 5, 6];
const evenNums = Num.filter((num) => num % 2 == 0);
console.log("filter function : " + evenNums);

//using slice function
const Names = ["Saurabh", "Sahil", "Kunal", "Rahul", "Priti"];
const topNames = Names.slice(0, 4);
console.log("slice function : " + topNames);

//using splice function
Names.splice(1, 2, "Sid", "Prem");
console.log("splice function : " + Names);
