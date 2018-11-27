const qr = require('qr-image')
const { createCanvas,Image,loadImage } = require('canvas')
const path = require('path')
const fs = require('fs')

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

const drawText = (ctx, text) => {
    // 首先对文本去掉换行符和制表符这些
    const noSpaceContent = text.replace(/(\n|\t|\r)/g, '')
// 使用canvas的measureText方法得到一个中文的宽度，然后用最大宽度除以它得到一行最多可容纳的字符数
    const oneTextWidth = context.measureText('测').width
    const oneLineMaxTextNumber = Math.ceil(204 / oneTextWidth)
// 最大行数
    let maxLineNumber = 4
// 当前行数
    let current = 4
    while (current > 0) {
        let tmpText = noSpaceContent.substring(oneLineMaxTextNumber * (maxLineNumber - current), oneLineMaxTextNumber * (maxLineNumber + 1 - current))
        // 最后一行文字显示省略号
        if (current === 1) {
            tmpText = tmpText.substring(0, tmpText.length - 2) + '...'
        }
        context.fillText(tmpText, 84, 62 + (maxLineNumber - current) * 15, 204)
        current--
    }
}

const drawJinLi = (ctx) => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/../assets/fenxiang_xiaocehngxu.png', (err, squid) => {
            if (err) throw err
            const img = new Image()
            img.onload = () => {
                ctx.drawImage(img, 0, 100, 400, 300)
                resolve();
            }
            img.onerror = err => { throw err }
            img.src = squid
        })
    })
}

// 二维码
const drawQRCode =  (ctx,text,cb)=>{
    const url = 'https://www.xiteng.com:9933/create_qrcode?text=https://www.xiteng.com/xitenggamejar/index?discountGameId=1792&inviteGroupId=1825&inviteId=25242' ;
    loadImage(url).then(qrimg=>{
        ctx.drawImage(qrimg, 0, 400, 400, 300)
        cb();
    });

}

// 生成整张分享图
exports.createShareImg = function (req, res) {
    const canvas = createCanvas(750, 1334);
    const ctx = canvas.getContext('2d')


    var text = '我再尝试下';
    //字体大小,类型
    ctx.font = '30px 宋体';
    //字体颜色
    ctx.strokeStyle = 'green';
    //绘制区域,设置空心字体
    ctx.lineWidth = 1;  //设置线条宽度,默认为1px
    ctx.strokeText(text,100,100);  //(text,x,y);



    //锦鲤
    drawJinLi(ctx).then(()=>{
        //二维码
        drawQRCode(ctx,'',()=>{
            const stream = canvas.createPNGStream()
            stream.pipe(res)
        })
    })
}
