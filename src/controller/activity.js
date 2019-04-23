// 2、抽签抢购邀请拼团链接：图片、文字
// 3、我-邀请好友：
// （1）图片、输入文字  
// （2）立即邀请：图片、文字
// （3）微信好友链接：图片、文字
// 4、奖品详情：中签榜-抽签抢-中签详情-奖品详情：图片
// 5、首页-抢购规则：图片、抽签抢商品详情规则、图片

const text = '亲,送你2个红包,专享1折抢购!优质名品,全场1折!'

exports.activityInfo = function (req, res) {
    const info =  {
        "invite_group": {
            "picture": "http://qnimage.xiteng.com/invite_linkk@2x.png",
            "text": text
        },
        "me_invite_friend": {
            "input_text": "猪年大吉，金猪送福，抽签抢手机，100部，抽中即送，公开透明，立即抢！",
            "picture": "http://qnimage.xiteng.com/me_fri@2x.png",
            "invite_link": {
                "picture": "http://qnimage.xiteng.com/invite_linkk@2x.png",
                "text": text
            },
            "invite_info": {
                "picture": "http://qnimage.xiteng.com/yaoqing_bg.png",
                "text": text
            }
        },
        "rule": {
            "zero_picture": "http://qnimage.xiteng.com/image_rule_v20.jpg",
            "common_picture": "http://qnimage.xiteng.com/image_rule_v20.jpg",
            
        },
        "awards": {
            "picture": "http://qnimage.xiteng.com/image_reward_xiangqing.jpg",
            
        },
        "home_activity_big_picture": "http://qnimage.xiteng.com/picture_home_0.jpg",
        "zerobg": "http://qnimage.xiteng.com/photo_bg_chouqian2@2x.png",
        "threed_spectial": "http://qnimage.xiteng.com/icon_3Drexia@2x.png",
        "threed_header": "http://qnimage.xiteng.com/icon_3D_qianggo@2x.png",
        "banner": "http://qnimage.xiteng.com/banner_002.jpg",
        "zerolabel": "抽签抢"
    }

    res.send(info);
}