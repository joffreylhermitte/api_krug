import { Router } 	from 'express';
import { Container } 								from 'typedi';
import middlewares 									from '../middlewares';
import config from '../../config';

const route = Router();

async function inscription(mail) {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "noreply.krug@gmail.com",
                pass: "azertyuiop76"
            }
        });

        if (transporter) {
            await transporter.sendMail({
                from: '"krug" <noreply.krug@gmail.com>', // sender address
                to: mail , // list of receivers
                subject: 'Bienvenue sur krug !', // Subject line
                text: 'Bonjour et bienvenue sur krug, \n ', // plain text body
                html:
                    '<p>Bonjour et bienvenue, je suis Gwenvael le fondateur de chympy.</p>' +

                    '<a href="http://localhost:4200/verify">Valider mon compte</a><br/>'
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export default (app) =>
{
    app.use('/user', route);

    route.get('/all',async (req,res) => {
        const userService 	= Container.get('user.service');
      await  userService.List().then(data => {
            console.log(data);
            res.json(data);
        })

    })
    route.get('/one/:id',async (req,res) => {
        const userService 	= Container.get('user.service');
        await  userService.One(req.params.id).then(data => {
            console.log(data);
            res.json(data);
        })

    })
    route.get('/suspend/:id', async (req,res) => {
        const userService 	= Container.get('user.service');
        await userService.Suspend(req.params.id).then(data => {
            res.json('Deleted');
        })
    })
    route.get('/delete/:id', async (req,res) => {
        const userService 	= Container.get('user.service');
        await userService.Delete(req.params.id).then(data => {
            res.json('Deleted');
        })
    })
    route.post(
        '/verificationMail',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Verification email endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'Verification mail works !'});
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.put(
        '/premium',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Premium endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'Premium works !'});
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.put(
        '/verified',
        async (req, res, next) =>
        {
            const logger = Container.get('logger');

            logger.debug('Calling Verified endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'Verified works !'});
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
                return res.status(200).json({msg:'Edit user works !'});
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

            logger.debug('Calling All users endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'All user works !'});
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

            logger.debug('Calling single user endpoint with body: %o', req.body );

            try
            {
                return res.status(200).json({msg:'Single user works !'});
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

            logger.debug('Calling delete user endpoint with params: %o', req.params );

            try
            {
                return res.status(200).json({msg:'Delete user works !'});
            }
            catch (e)
            {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );




};
