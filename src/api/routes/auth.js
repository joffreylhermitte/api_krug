import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
	app.use('/auth', route);

	route.post(
		'/register',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling Register endpoint with body: %o', req.body );

			try
			{
				const data = req.body;
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.register(data);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.post(
		'/login',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling Login endpoint with body: %o', req.body );

			try
			{
				const authServiceInstance 	= Container.get('auth.service');
				await authServiceInstance.login(req.body).then(result =>{
					//console.log(result,'rere');
					return res.status(200).json(result);
				});

			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.post(
		'/2fa/:id',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling 2fa endpoint with body: %o', req.body );

			try
			{
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.check2fa(req.body,req.params.id);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.post(
		'/forgotPassword',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling forgotPassword endpoint with body: %o', req.body );

			try
			{

				const data = req.body;
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.forgotPassword(data);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.put(
		'/2fa/activate/:id',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling 2fa/activate endpoint with body: %o', req.body );

			try
			{
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.activate(req.params.id);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.put(
		'/2fa/deactivate/:id',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling 2fa/deactivate endpoint with params: %o', req.params );

			try
			{
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.deactivate(req.params.id);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);

	route.put(
		'/resetPassword',
		async (req, res, next) =>
		{
			const logger = Container.get('logger');

			logger.debug('Calling resetPassword endpoint with body: %o', req.body );

			try
			{

				const data = req.body;
				const authServiceInstance 	= Container.get('auth.service');
				const result 		= await authServiceInstance.resetPassword(data);
				return res.status(200).json(result);
			}
			catch (e)
			{
				logger.error('🔥 error: %o', e);
				return next(e);
			}
		},
	);
};
