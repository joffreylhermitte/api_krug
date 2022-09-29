import session		from 'express-session';
import bodyParser 	from 'body-parser';

import apiRoutes 	from '../api';
import config 		from '../config';
import cors from 'cors';

export default (app) => {

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(session({
	secret: config.jwtSecret,
	resave: true,
	saveUninitialized: true
  }));
  
  app.use(config.api.prefix, apiRoutes());
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

};
