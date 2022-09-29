import { Router } 	from 'express';
import auth 		from './routes/auth';
import user 		from './routes/user';
import account      from './routes/account';
import algo         from './routes/algo';
import ban          from './routes/ban';
import reason       from './routes/reason';
import game         from './routes/game';
import createdGame  from './routes/createdGame';
import riot         from './routes/riot';



export default () => {
	const app = Router();

	auth(app);
	user(app);
	account(app);
	algo(app);
	ban(app);
	reason(app);
	game(app);
	createdGame(app);
	riot(app)



	return app
}
