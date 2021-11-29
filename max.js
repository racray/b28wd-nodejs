const [,,nums] = process.argv;

const arr = JSON.parse(nums);

console.log(Math.max(...arr));