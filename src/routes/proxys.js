const express = require('express');

const router = express.Router();
const proxy = require('http-proxy-middleware');

// 代理服务
router.use('/', proxy({
    target: 'http://123.57.161.212:9939/',
    changeOrigin: true,
}));

module.exports = router;
