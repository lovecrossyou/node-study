var express = require('express');
var compression = require('compression');
var helmet = require('helmet')
// Create our Express application
var app = express();
var proxys = require('./src/routes/proxys')

app.use(compression());
app.disable('x-powered-by');
var ejs = require('ejs');  //我是新引入的ejs插件


app.set('views', './dist'); // 指定视图所在的位置

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.use(express.static(__dirname + "/dist/"));

app.use('/xitenggamejar', proxys);


app.get('/', function (req, res) {
    res.render('index')
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
