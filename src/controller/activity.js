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
            "picture": "http://qnimage.xiteng.com/invite_link@2x.png",
            "text": "猪年大吉，金猪送福，抽签抢苹果电脑，抽中即送，祝你好运！"
        },
        "me_invite_friend": {
            "input_text": "猪年大吉，金猪送福，抽签抢苹果笔记本电脑，抽中即送，公开透明，祝你好运！",
            "picture": "http://qnimage.xiteng.com/me_invite_friend@2x.png",
            "invite_link": {
                "picture": "http://qnimage.xiteng.com/invite_link@2x.png",
                "text": "猪年大吉，金猪送福，抽签抢苹果电脑，抽中即送，祝你好运！"
            },
            "invite_info": {
                "picture": "http://qnimage.xiteng.com/invite_picture@2x.png",
                "text": "猪年大吉，金猪送福，抽签抢苹果笔记本电脑，抽中即送，公开透明，祝你好运！"
            }
        },
        "rule": {
            "zero_picture": "",
            "common_picture": "",
            
        },
        "awards": {
            "picture": "",
            
        },
        "home_activity_big_picture": "http://qnimage.xiteng.com/%E8%8B%B9%E6%9E%9C%E7%94%B5%E8%84%91%E9%A6%96%E9%A1%B5.jpg"
    }

    res.send(info);
}