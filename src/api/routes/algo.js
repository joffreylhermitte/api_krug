import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

export default (app) =>
{
    app.use('/algo', route);

    route.post(
        '/add',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Add algo endpoint with body: %o', req.body );

            try
            {
                const data = req.body;
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.add(data);
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

            logger.debug('Calling Edit algo endpoint with body: %o', req.body  );

            try
            {
                const data = req.body;
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.edit(data,req.params.id);
                return res.status(200).json(result);
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );
    route.get('/test',(req,res)=>{
        res.json('test')
    })


    route.get(
        '/all',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling All algo endpoint ' );

            try
            {
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.all();
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
        '/calculDemo',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling calculdemo endpoint ' );

            try
            {
                const id = req.params.id;
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.calculDemo();
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
        '/calcul/:id',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling calcul endpoint ' );

            try
            {
                const id = req.params.id;
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.calcul(id);
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

            logger.debug('Calling Single algo endpoint with params: %o', req.params );

            try
            {

                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.getOne(req.params.id);
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

            logger.debug('Calling delete algo endpoint with params: %o', req.params );

            try
            {
                const algoService 	= Container.get('algo.service');
                const result 		= await algoService.delete(req.params.id);
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
