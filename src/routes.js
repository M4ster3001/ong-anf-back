import { Router } from 'express';
require( 'dotenv' ).config({ path: 'variables.env' });

const routes = Router();

import multer from 'multer';
import multerConfig from './multer';

import LocationController from './controllers/LocationController';
const locationController = new LocationController();

import UsersController from './controllers/UsersController';
const usersControllers = new UsersController();

import AnimalsController from './controllers/AnimalsController';
const animalsControllers = new AnimalsController();

import { Login, User } from './middleware/validation';

if( process.env.NODE_DEV == 'DEVELOPMENT' ) { 

    routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' });  });
    routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' });  });
    
}

//State
routes.get( '/states', locationController.states );

//Cities
routes.get( '/cities/:uf', locationController.cities );

//Users
routes.get( '/users', usersControllers.index );
routes.post( '/login', Login.validations, usersControllers.login );
routes.get( '/users/profile', usersControllers.show );
routes.post( '/users/register', User.validations, usersControllers.create );
routes.put( '/users/update/:id', User.validations, usersControllers.update );
routes.delete( '/users/delete/:id', usersControllers.del );


//Animals 
routes.get( '/animals', animalsControllers.index );
routes.get( '/animals/user/:id', animalsControllers.index );
routes.get( '/animals/:id', animalsControllers.show );
routes.post( '/animals/register', multer( multerConfig ).single( 'file' ), animalsControllers.create );
routes.post( '/animals/update/:id', multer( multerConfig ).single( 'file' ), animalsControllers.update );
routes.put( '/animals/found/:id', animalsControllers.update );
routes.delete( '/animals/delete/:id', animalsControllers.del );

export default routes;