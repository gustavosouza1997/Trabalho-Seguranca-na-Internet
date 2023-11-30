  const https = require('https');
  const fs = require('fs');
  const express = require('express');
  const bodyParser = require('body-parser');
  const curriculosRoutes = require('./routes/curriculos');
  const dotenv = require('dotenv').config();
  const { setup_db } = require('./controller/db-setup');
  const cookieParser = require('cookie-parser');
  const csrf = require('csurf');

  const app = express();
  const port = process.env.APP_PORT

  app.set('view engine', 'ejs');
  app.set('view cache', false);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cookieParser(process.env.COOKIES_SECRET));
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      },
    })
  );

  app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  app.use('/', curriculosRoutes);

  const privateKey = fs.readFileSync('./certificado.key', 'utf8');
  const certificate = fs.readFileSync('./certificado.cert', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, async () => {
    console.log(`HTTPS Server running on https://localhost:${port}`);
    await setup_db();
  });
