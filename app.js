var express = require('express');
var proxys = require('./src/routes/proxys')


var app = express();

var ejs = require('ejs');  //我是新引入的ejs插件


app.set('views', './views'); // 指定视图所在的位置

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.use(express.static(__dirname + "/public/"));

// app.use('/api', proxys);

app.get('/', function (req, res) {
    res.render('index')
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
