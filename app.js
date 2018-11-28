var express = require('express');
var compression = require('compression');
// Create our Express application
var app = express();
var proxys = require('./src/routes/proxys')
var http = require('http');
var https = require('https');
var fs = require('fs')


var controller = require('./src/controller');

// var options = {
//     key: fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.key'),
//     cert: fs.readFileSync('/home/xituser/xiteng-server/software/ssl/214753937810730.pem')
// }

app.use(compression());
app.disable('x-powered-by');
var ejs = require('ejs');  //我是新引入的ejs插件
app.set('views', './views'); // 指定视图所在的位置
//
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use('/xitenggamenode', express.static(__dirname + "/views/"));

app.use('/xitenggamejar', proxys);

app.get('/', function (req, res) {
    res.render('index')
});
// 生成二维码
app.get('/create_qrcode', controller.qrcode.create_qrcode);
app.get('/createShareImg', controller.qrcode.createShareImg);
//获取七牛baseUrl
app.post('/qiniuBaseUrl', controller.qiniu.baseUrl)

// var server = https.createServer(options, app).listen(9934, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('app listening at http://%s%s', host, port);
//     console.log('app address', host, port);
// });

var server = http.createServer(app).listen(9934, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('ranning at port', port);
});

