import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/riot', route);

    route.post(
        '/lastMatches',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling lastMatches endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const riotService 	= Container.get('riot.service');
                const result 		= await riotService.lastMatches(data);
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
        '/allMatches',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling allMatches endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const riotService 	= Container.get('riot.service');
                const result 		= await riotService.allMatches(data);
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
        '/oneMatch',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling oneMatch endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const riotService 	= Container.get('riot.service');
                const result 		= await riotService.oneMatch(data);
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
        '/summoner',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling summoner endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const riotService 	= Container.get('riot.service');
                const result 		= await riotService.summoner(data);
                console.log(result);
                if (result.status !== undefined) {
                  return res.status(result.status).json(result.data);
                }

                return res.status(404).json(result.data);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

};
