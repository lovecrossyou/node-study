const qr = require('qr-image')
const path = require('path')
const fs = require('fs')
const {startDraw} = require('../util/draw')

// 生成二维码
exports.create_qrcode = function (req, res) {
    const params = req.query;
    let text = '';
    Object.keys(params).forEach(function (key) {
        if (text === '') {
            text = params[key];
        }
        else {
            text += '&' + key + '=' + params[key];
        }
    })
    try {
        var img = qr.image(text, {size: 10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
}

// 生成整张分享图
exports.createShareImg = function (req, res) {
    startDraw(req,res)
}


