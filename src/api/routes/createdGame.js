import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/createdGame', route);

    route.post(
        '/add',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add created game endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('createdGame.service');
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

    route.post(
        '/member/team1/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling add tem1 member endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('createdGame.service');
                const result 		= await gameService.addMemberTeam1(data,req.params.id);
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
        '/member/team2/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling add tem2 member endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('createdGame.service');
                const result 		= await gameService.addMemberTeam2(data,req.params.id);
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
        '/member/edit/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Edit member endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'Edit member works !'});
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.put(
        '/resetPassword/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Reset password endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('createdGame.service');
                const result 		= await gameService.editPassword(data,req.params.id);
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

            logger.debug('Calling Edit endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const gameService 	= Container.get('createdGame.service');
                const result 		= await gameService.edit(data,req.params.id);
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

            logger.debug('Calling All created game endpoint' );

            try
            {
                const gameService 	= Container.get('createdGame.service');
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

            logger.debug('Calling All game per user endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('createdGame.service');
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

            logger.debug('Calling Single created game endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('createdGame.service');
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

            logger.debug('Calling Delete created game endpoint with params: %o', req.params );

            try
            {
                const gameService 	= Container.get('createdGame.service');
                const result 		= await gameService.delete(req.params.user);
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
