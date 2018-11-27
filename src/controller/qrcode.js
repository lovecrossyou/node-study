const qr = require('qr-image')
// const Canvas = require('canvas')


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

// const drawText = (ctx, text) => {
//     // 首先对文本去掉换行符和制表符这些
//     const noSpaceContent = text.replace(/(\n|\t|\r)/g, '')
// // 使用canvas的measureText方法得到一个中文的宽度，然后用最大宽度除以它得到一行最多可容纳的字符数
//     const oneTextWidth = context.measureText('测').width
//     const oneLineMaxTextNumber = Math.ceil(204 / oneTextWidth)
// // 最大行数
//     let maxLineNumber = 4
// // 当前行数
//     let current = 4
//     while (current > 0) {
//         let tmpText = noSpaceContent.substring(oneLineMaxTextNumber * (maxLineNumber - current), oneLineMaxTextNumber * (maxLineNumber + 1 - current))
//         // 最后一行文字显示省略号
//         if (current === 1) {
//             tmpText = tmpText.substring(0, tmpText.length - 2) + '...'
//         }
//         context.fillText(tmpText, 84, 62 + (maxLineNumber - current) * 15, 204)
//         current--
//     }
// }
//
// const drawImage = (ctx, img) => {
//     // Draw cat with lime helmet
//     loadImage('examples/images/lime-cat.jpg').then((image) => {
//         ctx.drawImage(image, 50, 0, 70, 70)
//
//     })
// }
//
// exports.createShareImg = function (req, res) {
//     const canvas = new Canvas(300, 120) // 按照微信官方要求，长宽比5:4
//     const context = canvas.getContext('2d')
//     ctx.font = '14px "Microsoft YaHei"' // 统一使用微软雅黑字体
//     context.fillText('Hellow', 84, 24, 204);
// }
