const http = require("http")


const server = http.createServer((req,res)=> {
    res.writeHead(200);
    res.end('hello world')
})

server.listen(3000, () =>{
    console.log('server is listening to 3000')
})