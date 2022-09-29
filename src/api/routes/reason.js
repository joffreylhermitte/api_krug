import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/reason', route);

    route.post(
        '/add',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add reason endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const reasonServiceInstance 	= Container.get('reason.service');
                const result 		= await reasonServiceInstance.add(data);
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

            logger.debug('Calling Edit reason endpoint with body: %o', req.body  );

            try
            {
                const data = req.body;
                const reasonServiceInstance 	= Container.get('reason.service');
                const result 		= await reasonServiceInstance.edit(data,req.params.id);
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

            logger.debug('Calling All reason endpoint' );

            try
            {
                const reasonServiceInstance 	= Container.get('reason.service');
                const result 		= await reasonServiceInstance.all();
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

            logger.debug('Calling Single reason endpoint with params: %o', req.params );

            try
            {
                const reasonServiceInstance 	= Container.get('reason.service');
                const result 		= await reasonServiceInstance.getOne(req.params.id);
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

            logger.debug('Calling delete reason endpoint with params: %o', req.params );

            try
            {
                const reasonServiceInstance 	= Container.get('reason.service');
                const result 		= await reasonServiceInstance.delete(req.params.id);
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
