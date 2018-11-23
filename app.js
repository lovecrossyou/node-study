var express = require('express');
var compression = require('compression');
var helmet = require('helmet')
// Create our Express application
var app = express();
var proxys = require('./src/routes/proxys')
var http = require('http');
var https = require('https');
var fs = require('fs')
var qr = require('qr-image')

var options = {
    key:fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.key'),
    cert:fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.pem')
}

app.use(compression());
app.disable('x-powered-by');
var ejs = require('ejs');  //我是新引入的ejs插件
app.set('views', './views'); // 指定视图所在的位置
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + "/views/"));
app.use('/xitenggamejar', proxys);

app.get('/', function (req, res) {
    res.render('index')
});

// 生成二维码
app.get('/create_qrcode', function (req, res, next) {
    var text = req.query.text;
    try {
        var img = qr.image(text,{size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
})

var server = https.createServer(options,app).listen(9933, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});

// var server = http.createServer(app).listen(9933, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('app listening at http://%s:%s', host, port);
// });

