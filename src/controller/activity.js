// 2、抽签抢购邀请拼团链接：图片、文字
// 3、我-邀请好友：
// （1）图片、输入文字  
// （2）立即邀请：图片、文字
// （3）微信好友链接：图片、文字
// 4、奖品详情：中签榜-抽签抢-中签详情-奖品详情：图片
// 5、首页-抢购规则：图片、抽签抢商品详情规则、图片

exports.activityInfo = function (req, res) {
    const info =  {
        "invite_group": {
            "picture": "http://qnimage.xiteng.com/invite_linkk@2x.png",
            "text": "猪年大吉，金猪送福，参加3D抢购！中签即送，立即抢！"
        },
        "me_invite_friend": {
            "input_text": "猪年大吉，金猪送福，一起来参加3D抢购！中签即送，公开透明，立即抢！",
            "picture": "http://qnimage.xiteng.com/me_fri@2x.png",
            "invite_link": {
                "picture": "http://qnimage.xiteng.com/invite_linkk@2x.png",
                "text": "猪年大吉，金猪送福，参加3D抢购！中签即送，立即抢！"
            },
            "invite_info": {
                "picture": "http://qnimage.xiteng.com/invite@2x.png",
                "text": "猪年大吉，金猪送福，一起来参加3D抢购！中签即送，公开透明，立即抢！"
            }
        },
        "rule": {
            "zero_picture": "http://qnimage.xiteng.com/%E8%A7%84%E5%88%99-%E6%8A%BD%E7%AD%BE%E6%8A%A2.jpg",
            "common_picture": "http://qnimage.xiteng.com/%E5%96%9C%E8%85%BE%E6%8A%A2%E8%B4%AD%E6%B4%BB%E5%8A%A8%E8%A7%84%E5%88%99.jpg"
        },
        "awards": {
            "picture": "http://qnimage.xiteng.com/photo_xiangqing@2x%281%29.jpg"
        },
        "home_activity_big_picture": "http://qnimage.xiteng.com/%E8%8B%B9%E6%9E%9C%E7%94%B5%E8%84%91%E9%A6%96%E9%A1%B5.jpg",
        "zerobg": "http://qnimage.xiteng.com/photo_bg_chouqian@2x.png",
        "threed_spectial": "http://qnimage.xiteng.com/icon_3Drexia@2x.png",
        "threed_header": "http://qnimage.xiteng.com/icon_3D_qianggo@2x.png"
    }

    res.send(info);
}