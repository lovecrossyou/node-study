const qr = require('qr-image')
var QRCode = require('qrcode')
const { Image ,createCanvas} = require('canvas')
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

        QRCode.toDataURL(text, { errorCorrectionLevel: 'H' ,scale:1, width:200, color: {
                dark: '#e6454aff',  // Blue dots
                light: '#ffffffff' // Transparent background
            }},function (err, url) {
            const img = new Image()
            img.onload = () =>{



                const canvas = createCanvas(200, 200);
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0)

                const stream = canvas.createPNGStream()
                stream.pipe(res)
                // res.writeHead(200, {'Content-Type': 'image/png'});
                // img.pipe(res);
            }
            img.onerror = err => { throw err }
            img.src = url;

            console.log('thj+======',url)
            // var img = qr.image(text, {size: 10});


        })

    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
}

// 生成整张分享图
exports.createShareImg = function (req, res) {
    startDraw(req,res)
}


