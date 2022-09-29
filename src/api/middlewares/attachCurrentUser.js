import { Container } from 'typedi';


/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger =  Container.get('logger');
  try {
    const UserModel = Container.get('userModel');
    Logger.debug('Request:', req);
    const currentUser = await UserModel.findOne({ _id: req.user._id });
    if (!currentUser) {
      return res.sendStatus(401);
    }
    Reflect.deleteProperty(currentUser, 'password');
    req.currentUser = currentUser;
    return next();
  } 
  catch (e) 
  {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
