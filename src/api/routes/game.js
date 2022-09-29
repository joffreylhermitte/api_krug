import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/game', route);

    route.post(
        '/add',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add game endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('game.service');
                const result 		= await gameService.add(data);
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

            logger.debug('Calling all games endpoint ' );

            try
            {
                const gameService 	= Container.get('game.service');
                const result 		= await gameService.all();
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

            logger.debug('Calling All users games endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('game.service');
                const result 		= await gameService.findByUser(req.params.user);
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

            logger.debug('Calling Single game endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('game.service');
                const result 		= await gameService.findOne(req.params.id);
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

            logger.debug('Calling delete game endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('game.service');
                const result 		= await gameService.delete(req.params.id);
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
