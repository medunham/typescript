import * as express from 'express';

import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:4100', pathRewrite: { '^/api/auth': '' } }));
app.use('', createProxyMiddleware({ target: 'http://localhost:4200' }))
app.listen(4000);
