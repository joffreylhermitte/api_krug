import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/account', route);

    route.post(
        '/add/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add account endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.add(data,req.params.id);
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

            logger.debug('Calling all account endpoint ' );

            try
            {
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.all();
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
        '/all/:user',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling All users account endpoint with params: %o', req.params );

            try
            {
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.getUser(req.params.user);
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

            logger.debug('Calling Single account endpoint with params: %o', req.params );

            try
            {
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.getOne(req.params.id);
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
        '/delete/user/:user',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling delete user account endpoint with params: %o', req.params );

            try
            {
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.deleteUser(req.params.user);
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
        '/delete/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling delete account endpoint with params: %o', req.params );

            try
            {
                const accountServiceInstance 	= Container.get('account.service');
                const result 		= await accountServiceInstance.deleteOne(req.params.id);
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
