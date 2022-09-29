import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/ban', route);

    route.post(
        '/add',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add ban endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.add(data);
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
        '/edit/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Edit ban endpoint  with params: %o', req.params );

            try
            {
                const data = req.body;
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.edit(data,req.params.id);
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
        '/permanent/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling permanent ban endpoint  with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.permanent(req.params.id);
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
        '/effective/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling effective ban endpoint  with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.effective(req.params.id);
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );


    route.get(
        '/all',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling All ban endpoint' );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.all();
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '/permanent',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling get Permanent ban endpoint ' );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.getPermanent();
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '/effective',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling get Effective ban endpoint' );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.getEffective();
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '/reason/:reason',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling ban per reason endpoint with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.getByReason(req.params.reason);
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '/user/:user',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling ban per user endpoint with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.getByUser(req.params.user);
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        '/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Single ban endpoint with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.getOne(req.params.id);
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.delete(
        '/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Delete ban reason endpoint with params: %o', req.params );

            try
            {
                const banServiceInstance 	= Container.get('ban.service');
                const result 		= await banServiceInstance.delete(req.params.id);
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
