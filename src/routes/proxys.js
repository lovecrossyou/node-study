const express = require('express');

const router = express.Router();
const proxy = require('http-proxy-middleware');

// 代理服务
router.use('/', proxy({
    target: 'http://47.94.209.108:7007/',
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
        if (req.user && req.user.accessToken) { proxyReq.setHeader('Authorization', `Bearer ${req.user.accessToken}`); }
    },
    ws: true,
}));

module.exports = router;