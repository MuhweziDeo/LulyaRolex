import express from 'express';
import UserController from './UserController';
import AuthMiddleware from '../../middleware/AuthMiddleware';
import googlePassport from '../../helpers/auth/google';
import facebookPassport from '../../helpers/auth/facebook';
import twitterPassport from '../../helpers/auth/twitter';
import SocialValidator from '../../middleware/validationMiddleware/user/SocialValidator';
import UserValidator from '../../middleware/validationMiddleware/user/UserValidator';
import ProfileValidator from '../../middleware/validationMiddleware/user/ProfileValidator';


const router = express.Router();

router.post('/signup', UserValidator.createUserValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login', UserValidator.userLoginValidator, UserController.loginUser);

router.get('/user', AuthMiddleware.validateToken, UserController.getLoggedInUser);

router.post('/password-reset', UserValidator.validatePasswordResetRequest, UserController.requestPasswordReset);

router.put('/password-change', AuthMiddleware.validateToken, UserValidator.validateChangePassword, UserController.changePassword);

router.put('/password-reset/:token/confirm', UserValidator.validatePasswordResetConfirmation, UserController.passwordResetConfirm);

router.get('/profile/:username', UserController.getProfile);

router.get('/profiles', UserController.getProfiles);

router.put('/profile/:username', AuthMiddleware.validateToken, ProfileValidator.profileUpdateValidator, UserController.updateProfile)

router.post('/google', SocialValidator.facebookGoogleTokenValidator,googlePassport.authenticate('google-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/facebook', SocialValidator.facebookGoogleTokenValidator,facebookPassport.authenticate('facebook-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/twitter', SocialValidator.twitterTokenValidator, twitterPassport.authenticate('twitter-token',{session: false }),UserController.socialAuthenticationHandler);

export default router;
