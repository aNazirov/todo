const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/shapoval/test-task-backend/v2',
        createProxyMiddleware({
            target: 'https://anazirov.herokuapp.com/',
            changeOrigin: true,
        })
    )
};