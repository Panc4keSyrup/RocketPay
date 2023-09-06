const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        createProxyMiddleware('/nl35/checkout.api.nganluong.post.php',
        {
            target: 'https://sandbox.nganluong.vn',
            changeOrigin: true
        })
    )
}