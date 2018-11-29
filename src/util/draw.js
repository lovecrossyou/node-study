const { createCanvas,Image,loadImage } = require('canvas')

const startDraw = async (req,res) => {

    const {name,logo,qrText} = req.query ;

    const qrTextPretty = (qrText||'').replace(/__/g,'&');


    console.log('qrTextPretty ',qrTextPretty);

    // 创建画布
    const canvas = createCanvas(570, 940);
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,570,960);

    if(name){
        drawName(ctx, name||'');
    }
    drawDes(ctx, '亲，一起来免费抽签抢金条吧！', 0);
    drawDes(ctx, '下一条锦鲤就是你的', 1);
    await drawJinLi(ctx, '');
    drawcodeDes(ctx, '运势来袭，下一条锦鲤就是你的！', 0);
    drawcodeDes(ctx, '长按识别小程序，立即加入抢购', 1);
    if(qrTextPretty){
        await drawQR(ctx,qrTextPretty||'');
    }
    await drawZeroImg(ctx, '');
    if(logo){
        await drawAvatar(ctx, logo);
    }

    const stream = canvas.createPNGStream()
    stream.pipe(res)
}

const drawAvatar = async (ctx, icon) => {
    const myimg = await loadImage(icon);
    ctx.arc(570 / 2, 65, 35, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(myimg, 570 / 2 - 35, 30, 70, 70);
    ctx.restore()
}

const drawName = (ctx, name) => {
    ctx.beginPath();
    var text = name;
    //字体大小,类型
    ctx.fillStyle = "#333333";
    // ctx.textAlign='center'
    ctx.font = "24px";
    ctx.fillText(text, (570 - ctx.measureText(text).width) / 2, 140);
}

const drawDes = (ctx, des, index) => {
    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle = "#333333";
    ctx.font = "26px";
    ctx.fillText(text, (570 - ctx.measureText(text).width) / 2, 190 + 30 * index);

}

const drawJinLi = async (ctx, jinli) => {
    const avatar = __dirname + '/../assets/fenxiang_xiaocehngxu.png'
    const myimg = await loadImage(avatar);
    ctx.drawImage(myimg, (570 - 480) / 2, 250, 480, 440);
}

const drawcodeDes = (ctx, des, index) => {
    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle = "#e6454a";
    ctx.font = "24px";
    ctx.fillText(text, (570 - 480) / 2, 770 + 28 * index)

}

const drawQR = async (ctx, qrText) => {
    const myimg = await loadImage(qrText);
    ctx.drawImage(myimg, 400, 715, 120, 120);
}

const drawZeroImg = async (ctx, jinli) => {
    const avatar = __dirname + '/../assets/icon_0yuanqiang.png'
    const myimg = await loadImage(avatar);
    ctx.drawImage(myimg, (570 - 127) / 2, 860, 127, 27);
}


 module.exports= {
    startDraw
 }

