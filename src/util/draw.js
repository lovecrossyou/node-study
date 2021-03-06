const { createCanvas,Image,loadImage,registerFont } = require('canvas')
const BASE64  = require('./base64')
const queryString = require('querystring') ;
const axios = require('axios')

const width_canvas = 668;
const height_canvas = 960 +235;
const space_shade = 30;
var desHeight = 100;

registerFont(__dirname + '/PINGFANG.TTF', {family: '苹方'});

const startDraw = async (req,res) => {

    const {userName,logo,inviteId,discountGameId,des,download} = req.query ;

    let qrTextPretty = 'https://www.xiteng.com/xitenggamenode/create_qrcode?text=https://www.xiteng.com/xitenggamejar/index?discountGameId='+discountGameId+'&inviteId='+inviteId
    if(download!==undefined){
        qrTextPretty = 'https://www.xiteng.com/xitenggamenode/create_qrcode?text=https://www.xiteng.com/xitenggamenode/%23/buyingspree/page' ;
    }
    const avatarLogo = logo ;

    //请求活动参数数据
    const activeInfo = await axios.get('https://www.xiteng.com/xitenggamenode/activityInfo').then(res=>res.data);
    const me_invite_friend = activeInfo.me_invite_friend ;
    const {picture} = me_invite_friend.invite_info ;

    // 创建画布
    const canvas = createCanvas(width_canvas, height_canvas);
    const ctx = canvas.getContext('2d')
    await DrawImage(ctx,__dirname + '/../assets/share/bg_photo_yaoqing1.png',{x:0,y:0,w:width_canvas,h:height_canvas})
    if(userName){
        let nameStr = BASE64.decode(userName).replace(/\ +/g,"").replace(/[\r\n]/g,"");
        drawName(ctx, nameStr||'');
    }
    let desStr = activeInfo.invite_group.text
    drawDes(ctx, desStr, 0);
    await DrawImage(ctx,picture,{x:(width_canvas-520)/2,y:200+desHeight+50,w:520,h:400 +235})
    drawcodeDes(ctx, '新年运势来袭，免费参与抽签抢购！', 0);
    drawcodeDes(ctx, '长按识别小程序，立即加入抢购！', 1);
    if(qrTextPretty){
        await drawQR(ctx,qrTextPretty||'');
    }
    await drawZeroImg(ctx, '');
    await drawAvatar(ctx, avatarLogo);

    const stream = canvas.createPNGStream()
    res.writeHead(200, {'Content-Type': 'image/png','Accept-Charset':'utf-8'});
    stream.pipe(res)
}
const DrawImage = async (ctx,path,react)=>{
    const myimg = await loadImage(path);
    ctx.drawImage(myimg, react.x, react.y, react.w, react.h);
}
const drawAvatar = async (ctx, icon) => {
    const icon_xt = __dirname + '/../assets/logo_xiteng.png'
    const myimg = await loadImage(icon_xt);
    ctx.beginPath();
    ctx.arc(space_shade+80, space_shade+80, 40, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(myimg, space_shade+40, space_shade+40, 80, 80);
    ctx.restore()
}

const drawName = (ctx, name) => {
    ctx.beginPath();
    var text = name;
    ctx.fillStyle = "#333333";
    ctx.font = "24px 苹方";
    //字体大小,类型
    ctx.fillText(text, 140+space_shade, 85+space_shade);
}

const drawDes = (ctx, des, index) => {
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.font = "28px 苹方";
    ctx.lineWidth=1;
    var str = des
    var lineWidth = 0;
    var canvasWidth = 545;//计算canvas的宽度
    var initHeight=0;//绘制字体距离canvas顶部初始的高度
    var lastSubStrIndex= 0; //每次开始截取的字符串的索引
    if (str.length>50){
        str = str.substr(0,50)
    }
    for(let i=0;i<str.length;i++){

        lineWidth+=ctx.measureText(str[i]).width;
        if(lineWidth>canvasWidth){
            ctx.fillText(str.substring(lastSubStrIndex,i),45+space_shade,initHeight+200);//绘制截取部分
            initHeight+=35;//20为字体的高度
            lineWidth=0;
            lastSubStrIndex=i;
        }
        if(i==str.length-1){//绘制剩余部分
            ctx.fillText(str.substring(lastSubStrIndex,i+1),45+space_shade,initHeight+200);
            console.log(initHeight)
        }
        desHeight = initHeight;

    }

}
const drawcodeDes = (ctx, des, index) => {
    ctx.beginPath();
    var text = des;
    //字体大小,类型
    ctx.fillStyle = "#AE3A35";
    ctx.font = "24px 苹方";
    ctx.fillText(text, (width_canvas - 520) / 2, 760+235 + 40 * index)
}
const drawQR = async (ctx, qrText) => {
    await DrawImage(ctx,qrText,{x:460,y:705+235,w:125,h:125})
    await DrawImage(ctx,__dirname + '/../assets/share/logo_fenxiang_qianggou.png',{x:460+(125-35)/2,y:705+(125-35)/2+235,w:35,h:35})
}

const drawZeroImg = async (ctx, jinli) => {
    await DrawImage(ctx,__dirname + '/../assets/share/logo_fenxiang_qianggou1.png',{x:(width_canvas - 159) / 2,y:865+235,w:159,h:43})
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
    cxt.fillStyle = "#36454a";
    cxt.fill();


}
 module.exports= {
    startDraw
 }

