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
            "picture": "",
            "text": ""
        },
        "me_invite_friend": {
            "input_text": "",
            "picture": "http://qnimage.xiteng.com/me_invite_friend@2x%20.png",
            "invite_link": {
                "picture": "",
                "text": ""
            },
            "invite_info": {
                "picture": "",
                "text": ""
            }
        },
        "rule": {
            "zero_picture": "",
            "common_picture": ""
        },
        "awards": {
            "picture": ""
        },
        "home_activity_big_picture": ""
    }

    res.send(info);
}