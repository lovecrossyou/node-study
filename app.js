var express = require('express');
var compression = require('compression');
var helmet = require('helmet')
// Create our Express application
var app = express();
var proxys = require('./src/routes/proxys')
var http = require('http');
var https = require('https');
var fs = require('fs')

var options = {
    key:fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.key'),
    cert:fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.pem')
}

var options = {}
app.use(compression());
app.disable('x-powered-by');
var ejs = require('ejs');  //我是新引入的ejs插件
app.set('views', './dist'); // 指定视图所在的位置
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/dist/"));
app.use('/xitenggamenode', proxys);

app.get('/', function (req, res) {
    res.render('index')
});

// var server = http.createServer(app).listen(3001, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('Example app listening at http://%s:%s', host, port);
// });
https.createServer(options,app).listen(3002);
