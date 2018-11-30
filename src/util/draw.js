const { createCanvas,Image,loadImage,registerFont } = require('canvas')
// const width_canvas = 670;
const width_canvas = 570;
const height_canvas = 940;
var desHeight = 100;

registerFont(__dirname + '/PINGFANG.TTF', {family: '苹方'});

const startDraw = async (req,res) => {

    const {userName,logo,inviteId,discountGameId,des} = req.query ;

    const qrTextPretty = 'https://www.xiteng.com/xitenggamenode/create_qrcode?text=https://www.xiteng.com/xitenggamejar/index?discountGameId='+discountGameId+'&inviteId='+inviteId

    const avatarLogo = logo ;

    // 创建画布
    const canvas = createCanvas(width_canvas, height_canvas);
    const ctx = canvas.getContext('2d')
    await DrawImage(ctx,__dirname + '/../assets/share/bg_photo_yaoqing1.png',{x:0,y:0,w:width_canvas,h:height_canvas})
    drawRoundRect(ctx, (width_canvas-596)/2, 56, 596, 810, 10);

    if(userName){
        const nameStr = userName.split('__')[0]
        drawName(ctx, nameStr||'');
    }
    let desStr = '亲，一起来免费抽签抢金条吧！下一条锦鲤就是你!!!'
    if (des){
        desStr = des.split('__')[0]
    }
    drawDes(ctx, desStr, 0);
    await DrawImage(ctx,__dirname + '/../assets/share/fenxiang_xiaocehngxu.png',{x:(width_canvas-504)/2,y:190+desHeight+30,w:504,h:416})
    drawcodeDes(ctx, '运势来袭，下一条锦鲤就是你的！', 0);
    drawcodeDes(ctx, '长按识别小程序，立即加入抢购', 1);
    if(qrTextPretty){
        await drawQR(ctx,qrTextPretty||'');
    }
    await drawZeroImg(ctx, '');
    if(avatarLogo){
        await drawAvatar(ctx,avatarLogo);
    }
    await drawAvatar(ctx, avatarLogo);

    const stream = canvas.createPNGStream()
    stream.pipe(res)
}
const DrawImage = async (ctx,path,react)=>{
    const myimg = await loadImage(path);
    ctx.drawImage(myimg, react.x, react.y, react.w, react.h);
}
const drawAvatar = async (ctx, icon) => {

    const icon = __dirname + '/../assets/logo_xiteng.png'
    const myimg = await loadImage(icon);



    ctx.beginPath();
    ctx.arc(width_canvas / 2, 65, 35, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(myimg, width_canvas / 2 - 35, 30, 70, 70);
    ctx.restore()
}

const drawName = (ctx, name) => {
    ctx.beginPath();
    var text = name;
    //字体大小,类型
    ctx.fillStyle = "#333333";
    // ctx.textAlign='center'
    ctx.font = "24px 苹方";
    ctx.fillText(text, (width_canvas - ctx.measureText(text).width) / 2, 140);
}

const drawDes = (ctx, des, index) => {
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.font = "26px 苹方";
    ctx.lineWidth=1;
    var str = des
    var lineWidth = 0;
    var canvasWidth = 450;//计算canvas的宽度
    var initHeight=0;//绘制字体距离canvas顶部初始的高度
    var lastSubStrIndex= 0; //每次开始截取的字符串的索引
    if (str.length>50){
        str = str.substr(0,50)
    }
    for(let i=0;i<str.length;i++){

        lineWidth+=ctx.measureText(str[i]).width;
        if(lineWidth>canvasWidth){
            ctx.fillText(str.substring(lastSubStrIndex,i),110,initHeight+190);//绘制截取部分
            initHeight+=35;//20为字体的高度
            lineWidth=0;
            lastSubStrIndex=i;
        }
        if(i==str.length-1){//绘制剩余部分
            ctx.fillText(str.substring(lastSubStrIndex,i+1),100,initHeight+190);
            console.log(initHeight)
        }
        desHeight = initHeight;

    }

}
const drawcodeDes = (ctx, des, index) => {
    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle = "#e6454a";
    ctx.font = "24px 苹方";
    ctx.fillText(text, (width_canvas - 480) / 2, 770 + 28 * index)
}
const drawQR = async (ctx, qrText) => {
    await DrawImage(ctx,qrText,{x:460,y:715,w:125,h:125})
    await DrawImage(ctx,__dirname + '/../assets/share/logo_fenxiang_qianggou.png',{x:460+(125-35)/2,y:715+(125-35)/2,w:35,h:35})
}

const drawZeroImg = async (ctx, jinli) => {
    await DrawImage(ctx,__dirname + '/../assets/share/logo_fenxiang_qianggou1.png',{x:(width_canvas - 155) / 2,y:890,w:155,h:35})
}
const drawRoundRect =(cxt, x, y, width, height, radius)=>{

    cxt.beginPath();
    cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    cxt.lineTo(width - radius + x, y);
    cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    cxt.lineTo(width + x, height + y - radius);
    cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    cxt.lineTo(radius + x, height +y);
    cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    cxt.closePath();
    cxt.fillStyle = "#fff";
    cxt.fill();


}
 module.exports= {
    startDraw
 }

