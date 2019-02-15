const qiniuBaseUrl = 'qnimage.xiteng.com' ;
exports.baseUrl = function (req,res) {
    res.send(qiniuBaseUrl)
}

exports.qiniuBaseUrl = qiniuBaseUrl ;