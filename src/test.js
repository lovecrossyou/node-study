// var utils = require('./utils');
// var async = require('async');
//
// var task1 = function (callback) {
//     var url = 'https://www.baidu.com';
//     utils.createQr(url, function (err, data) {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//             return;
//         }
//         callback(null, data);
//     })
// };
//
//
// async.waterfall([task1], function (err, result) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('result ',result);
// })
