import { Container } 	from 'typedi';
import LoggerInstance 	from './logger';
import config 			from '../config';
import AuthService      from '../services/auth';
import UserService      from '../services/users';
import AccountService   from '../services/account';
import ReasonService   from '../services/reason';
import BanService   from '../services/ban';
import AlgoService   from '../services/algo';
import GameService   from '../services/game';
import CreatedGameService   from '../services/createdGame';
import RiotService   from '../services/riot';


export default () => 
{
	try 
	{
		Container.set('logger', LoggerInstance);
		Container.set('auth.service',AuthService);
		Container.set('user.service',UserService);
		Container.set('account.service',AccountService);
		Container.set('reason.service',ReasonService);
		Container.set('ban.service',BanService);
		Container.set('algo.service',AlgoService);
		Container.set('game.service',GameService);
		Container.set('createdGame.service',CreatedGameService);
		Container.set('riot.service',RiotService);

		LoggerInstance.info('✌️ Logger injected into container');

		return;
	} 
	catch (e) 
	{
		LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
		throw e;
	}
};
