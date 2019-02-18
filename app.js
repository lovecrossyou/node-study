const {qiniuBaseUrl} = require("./src/controller/qiniu");

var express = require('express');
var compression = require('compression');
const bodyParser = require('body-parser');

var cors = require('cors');
// Create our Express application
var app = express();
var proxys = require('./src/proxy/proxys')
var http = require('http');
var routers = require('./src/router')
var multipart = require('connect-multiparty');
const {upload} = require('./src/util/qiniu')


// 允许跨域访问
app.use(cors());
app.use(compression());
app.disable('x-powered-by');

//formdata
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据



var ejs = require('ejs');  //我是新引入的ejs插件
app.set('views', './views'); // 指定视图所在的位置
//
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use('/xitenggamenode', express.static(__dirname + "/views/"));
app.use('/xitenggamejar', proxys);
app.use('/xitenggamenode',routers)



var multipartMiddleware = multipart();

app.post('/post',multipartMiddleware,function(req,res){
    console.log('req files',req.files);
    const file = req.files.file ;
    upload(file).then(d=>{
        res.status(200).send({
            imgUrl:'http://'+qiniuBaseUrl +'/'+ d.imgName
        })
    });
});


var server = http.createServer(app).listen(9934, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('ranning at host', host);
    console.log('ranning at port', port);
});
