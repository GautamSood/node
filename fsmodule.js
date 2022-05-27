const fs = require("fs");
/**
 * * reading the file here
 */
fs.readFile("readFsModule.txt","utf-8",(err,data)=>{
    console.log(data);
});
console.log("i am reading know");

/**
 * * we are writing here
 * fs.writeFile("writefsmodule.txt","hello i wrote this",(err) => {
    console.log("done");
})
console.log("writing the file");
 */

/**
 * * we are appending here
 * fs.appendFile("writefsmodule","we appended this",(err)=>{
    console.log("we appended the file");
});

 */

/**
 * * we have deleted file here
 * fs.unlink("writefsmodule",(err)=>{
    console.log("deleted");
});
 */
