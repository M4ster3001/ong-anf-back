import { Router } from 'express';
require( 'dotenv' ).config({ path: 'variables.env' });

import { check } from 'express-validator/check';

const routes = Router();

import multer from 'multer';
import multerConfig from './multer';

import LocationController from './controllers/LocationController';
const locationController = new LocationController();

import UsersController from './controllers/UsersController';
const usersControllers = new UsersController();

import AnimalsController from './controllers/AnimalsController';
const animalsControllers = new AnimalsController();

import { Login } from './middleware/validation';

if( process.env.NODE_DEV == 'DEVELOPMENT' ) { 

    routes.get( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok get' });  });
    routes.post( '/', ( req, res ) => { res.status( 200 ).json({ message: 'Ok post' });  });
    routes.get( '/users', usersControllers.index );
    
}

//State
routes.get( '/states', locationController.states );

//Cities
routes.get( '/cities/:uf', locationController.cities );

//Users
routes.post( '/login', Login.validations, usersControllers.login );
routes.get( '/users/:id', usersControllers.show );
routes.post( '/users/register', usersControllers.create );
routes.put( '/users/update/:id', usersControllers.update );
routes.delete( '/users/delete/:id', usersControllers.del );


//Animals 
routes.get( '/animals', animalsControllers.index );
routes.get( '/animals/:id', animalsControllers.show );
routes.post( '/animals/register', multer( multerConfig ).single( 'file' ), animalsControllers.create );
routes.put( '/animals/update/:id', animalsControllers.update );
routes.put( '/animals/found/:id/:id_finder', animalsControllers.update );
routes.delete( '/animals/delete/:id', animalsControllers.del );

export default routes;