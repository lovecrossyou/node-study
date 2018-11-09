var utils = {};
var fs = require('fs');
var qr = require('qr-image');
var Jimp = require("jimp");


/**
 * 根据地址生成二维码
 * 参数 url(string) 地址
 * 参数 callback(Function)
 */

const mask_image_width = 750 ;
const mask_image_height = 1334 ;

const qr_image_width = 150 ;
const qr_image_height = 150 ;


utils.createQr = function (url, callback) {
    var qr_png = qr.imageSync(url, {type: 'png', size: 6});
    // qr.image(text, [ec_level | options]) — Readable stream with image data;
    // qr.imageSync(text, [ec_level | options]) — string with image data. (Buffer for png);
    // qr.svgObject(text, [ec_level | options]) — object with SVG path and size;
    // qr.matrix(text, [ec_level]) — 2D array.

    Jimp.read(qr_png)
        .then(function (qrImage) {
            // Do stuff with the image.
            callback(null, qrImage);
            console.log('image ', qrImage)
            Jimp.read('./bg.png')
                .then(function(image) {
                    image.mask( qrImage, (mask_image_width - qr_image_width)/2, (mask_image_height-qr_image_height)-60 );          // masks the image with another Jimp image at x, y using average pixel value
                    return image
                        .resize(mask_image_width, mask_image_height) // resize
                        .quality(60) // set JPEG quality
                        .write('lena-small-bw.jpg'); // save

                })
        .catch(function(err){
                // Handle an exception.
            });

        })
        .catch(function (err) {
            // Handle an exception.
            console.log('err ', err)
        });
};


module.exports = utils;
