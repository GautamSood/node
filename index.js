/**
 * * this is simple web server ⬅️
 */
const fs = require("fs");
const http = require("http");
const url = require("url");

/**
 * ? I can also directly listen to the http.createserver like
 * ? 👉const server = http.createServer((req,res) => {
 * ? res.end("Hello World");
 * ? }).listen("8000","127.0.0.1",()=>{ console.log("done");
 * ? })

 */



const server = http.createServer((req,res) => {

    const PathName = req.url;
    if(PathName === "/" || PathName === "/overview" ){
        res.end("This is overview");
    }else if(PathName === "/products"){
        res.end("These are products");
    }else if( PathName === "/api"){
      fs.readFile(`${__dirname}/data.json`,"utf-8",(err,data)=>{
          const productdata = JSON.parse(data);
          console.log(productdata);

          res.writeHead(200, {
            "Content-type":"application/json",
            "my-own-header":"the-header"
        })
          res.end(data);
      }) 
      
    }

    else{
    res.writeHead(404, {
        "Content-type":"text/html",
        "my-own-header":"the-header"
    })
    res.end("<h1>Page not found</h1>");
}
})
server.listen(8000,"localhost",(err)=>{
 console.log("this is working");   
})

