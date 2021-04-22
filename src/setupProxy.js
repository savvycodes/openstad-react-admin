/**
 * These proxy's are set up for dev to prevent issues
 * @type {[type]}
 */

const createProxyMiddleware = require('http-proxy-middleware');
console.log('register proxy for dev');

module.exports = function(app) {
    console.log('process.env', process.env);

    app.use(
    '/api',
    createProxyMiddleware({
  //    target: 'https://image-server2.openstadsdeel.nl',
      target: 'http://localhost:' +  process.env.REACT_APP_REST_API_PORT,
      changeOrigin: true,
    })
  );

  app.use(
        '/stats',
        createProxyMiddleware({
            target: 'http://localhost:'  + process.env.REACT_APP_REST_API_PORT,
            changeOrigin: true,
        })
    );

  app.use(
    '/image',
    createProxyMiddleware({
  //    target: 'https://image-server2.openstadsdeel.nl',
      target: 'http://localhost:' + process.env.REACT_APP_IMAGE_API_PORT,
      changeOrigin: true,
      onProxyReq : (proxyReq, req, res) => {


         // add custom header to request
         proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_IMAGE_API_KEY}`);
      }
    })
  );

  app.use(
    '/images',
    createProxyMiddleware({
      target: 'http://localhost:3333',
      changeOrigin: true,
      onProxyReq : (proxyReq, req, res) => {

         // add custom header to request
         proxyReq.setHeader('Authorization', `Bearer 27834y23874`);
      }
    })
  );
};
