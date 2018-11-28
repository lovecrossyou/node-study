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

// 二维码
const drawQRCode =  (ctx,text,cb)=>{
    const url = 'https://www.xiteng.com:9933/create_qrcode?text=https://www.xiteng.com/xitenggamejar/index?discountGameId=1792&inviteGroupId=1825&inviteId=25242' ;
    loadImage(url).then(qrimg=>{
        ctx.drawImage(qrimg, 0, 400, 300, 300)
        cb();
    });

}

// 生成整张分享图
exports.createShareImg = function (req, res) {

    const canvas = createCanvas(570, 940);
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,570,960);

    startDraw(canvas,ctx,res)

}

const startDraw = async (canvas,ctx,res)=> {

    drawName(ctx,'朱理者');
    drawDes(ctx,'亲，一起来免费抽签抢金条吧！',0);
    drawDes(ctx,'下一条锦鲤就是你',1);
    await drawJinLi(ctx,'');
    drawcodeDes(ctx,'运势来袭，下一条锦鲤就是你！',0);
    drawcodeDes(ctx,'长按识别小程序，立即加入抢购',1);
    await drawQR(ctx,'');
    await drawZeroImg(ctx,'');
    await drawAvatar(ctx,'');



    const stream = canvas.createPNGStream()
    stream.pipe(res)


}
const  drawAvatar =  async (ctx,Avatarurl)=>{
    const avatarurl = 'https://avatar-static.segmentfault.com/386/439/3864394909-561779d9ef82a_big64' ;
    const myimg = await loadImage(avatarurl);
    ctx.arc(570/2,65,35,0,2*Math.PI);
    ctx.clip();
    ctx.drawImage(myimg, 570/2-35, 30, 70, 70);
    ctx.restore()
}
const drawName = (ctx,name)=>{

    ctx.beginPath();
    var text = name;
    //字体大小,类型
    ctx.fillStyle="#333333";
    // ctx.textAlign='center'
    ctx.font="24px PingFangSC-Regular";
    ctx.fillText(text, (570 -ctx.measureText(text).width)/2,140);

}
const drawDes = (ctx,des,index)=>{

    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle="#333333";
    ctx.font="26px PingFangSC-Regular";
    ctx.fillText(text, (570 -ctx.measureText(text).width)/2,190+30*index);

}
const  drawJinLi = async (ctx,jinli)=>{
    const avatar = __dirname + '/../assets/fenxiang_xiaocehngxu.png'
    const myimg = await loadImage(avatar);
    ctx.drawImage(myimg, (570-480)/2, 250, 480, 440);
}
const drawcodeDes = (ctx,des,index)=>{

    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle="#e6454a";
    ctx.font="24px PingFangSC-Regular";
    ctx.fillText(text, (570-480)/2,770+28*index)

}

const  drawQR = async (ctx,jinli)=>{

    const url = 'https://www.xiteng.com:9933/create_qrcode?text=https://www.xiteng.com/xitenggamejar/index?discountGameId=1792&inviteGroupId=1825&inviteId=25242' ;
    const myimg = await loadImage(url);
    ctx.drawImage(myimg, 400, 715, 120, 120);
}
const  drawZeroImg = async (ctx,jinli)=>{

    const avatar = __dirname + '/../assets/icon_0yuanqiang.png'
    const myimg = await loadImage(avatar);
    ctx.drawImage(myimg, (570-127)/2, 860, 127, 27);
}


