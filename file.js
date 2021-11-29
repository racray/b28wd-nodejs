const fs = require('fs');

fs.readFile('./welcome.txt',"utf-8",(err,data)=>console.log(data));


const quote = "Everything is awesome";

fs.writeFile('./awesome.txt',quote,err=>console.log("completed"));

const quote2 = "good";

const [,,count] = process.argv;


for(let i = 0;i<count;i++){
    fs.writeFile(`./backup/text-${i}.txt`,quote,err=>console.log("completed",i));
 
}

fs.unlink(`./backup/text-1.txt`,err=>console.log("deleted"));
 

